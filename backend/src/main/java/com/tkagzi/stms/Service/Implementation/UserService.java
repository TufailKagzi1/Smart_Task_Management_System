package com.tkagzi.stms.Service.Implementation;

import com.tkagzi.stms.DTO.*;
import com.tkagzi.stms.Exception.OurException;
import com.tkagzi.stms.Model.Enums.Role;
import com.tkagzi.stms.Model.User;
import com.tkagzi.stms.Repository.UserRepository;
import com.tkagzi.stms.Service.Interface.IUserService;
import com.tkagzi.stms.Utils.JWTUtils;
import com.tkagzi.stms.Utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final Utils utils;
    private final JWTUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final TaskService taskService;


    public UserService(UserRepository userRepository, Utils utils, JWTUtils jwtUtils, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, TaskService taskService) {
        this.userRepository = userRepository;
        this.utils = utils;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.taskService = taskService;
    }

    @Override
    public Response register(RegisterRequestDTO requestDTO) {
        Response response = new Response();
        try {
            if (requestDTO.getRole() == null || requestDTO.getRole().toString().isBlank()) {
                requestDTO.setRole(Role.USER);
            }
            if (userRepository.existsByUsername(requestDTO.getUsername())
                    || userRepository.existsByEmail(requestDTO.getEmail())) {
                throw new OurException(requestDTO.getUsername() + " or " + requestDTO.getEmail() + "Already Exists");
            }
            requestDTO.setPassword(passwordEncoder.encode(requestDTO.getPassword()));
            User user = utils.mapRegisterDTOToUserEntity(requestDTO);
            User savedUser = userRepository.save(user);
            String jwtToken = jwtUtils.generateToken(savedUser);
            UserDTO userDTO = utils.mapUserEntityToUserDTOWithoutTasks(savedUser);
            response.setStatusCode(200);
            response.setToken(jwtToken);
            response.setUser(userDTO);
            response.setMessage("successful");
        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred During User Registration " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response Login(LoginRequest loginRequest) {
        Response response = new Response();
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
            var user = userRepository.findByUsername(loginRequest.getUsername()).orElseThrow(
                    () -> new OurException("user not found")
            );
            var token = jwtUtils.generateToken(user);
            response.setStatusCode(200);
            response.setToken(token);
            response.setRole(user.getRole());
            response.setExpirationTime("7 Days");
            response.setMessage("successful");
        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (AuthenticationException e) {
            response.setStatusCode(401);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred During User Login " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllUsers() {
        Response response = new Response();
        try {

            List<User> userList = userRepository.findAll();
            List<UserDTO> userDTOList = utils.mapUserListEntityToUserListDTO(userList);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setUserList(userDTOList);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred During getting all user " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteUserById(String userId) {
        Response response = new Response();
        try {

            userRepository.findById(Long.valueOf(userId))
                    .orElseThrow(() -> new OurException("User not found"));
            userRepository.deleteById(Long.valueOf(userId));
            response.setStatusCode(200);
            response.setMessage("successful");

        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred During Deleting User " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteUsername(String username) {
        Response response = new Response();
        try {

            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new OurException("User not found"));
            boolean b = taskService.deleteUserTasks(user);
            userRepository.delete(user);
            response.setStatusCode(200);
            response.setMessage("successful");

        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred During Deleting User " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getUserById(String userId) {
        Response response = new Response();
        try {

            User user = userRepository.findById(Long.valueOf(userId))
                    .orElseThrow(() -> new OurException("User not found"));

            UserDTO userDTO = utils.mapUserEntityToUserDTO(user);

            response.setUser(userDTO);
            response.setStatusCode(200);
            response.setMessage("successful");

        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred During getting User " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getMyInfo(String username) {
        Response response = new Response();
        try {

            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new OurException("User not found"));

            UserDTO userDTO = utils.mapUserEntityToUserDTO(user);

            response.setUser(userDTO);
            response.setStatusCode(200);
            response.setMessage("successful");

        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred During getting User details " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateUser(User user, String username) {
        Response response = new Response();
        try {
            if (user == null || username.isBlank()) throw new OurException("Invalid input");

            User db_user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new OurException("user does not exists"));

            db_user.setName(user.getName());
            db_user.setEmail(user.getEmail());

            User save = userRepository.save(db_user);

            response.setUser(utils.mapUserEntityToUserDTO(save));
            response.setMessage("success");
            response.setStatusCode(200);

        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred during updating profile" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response changeRole(String username, String userId) {
        Response response = new Response();
        try {
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new OurException("User not found"));

            if (!(user.getRole() == Role.ADMIN)) {
                throw new OurException("only admin can change roles");
            }

            User updatedUser = userRepository.changeRole(Long.valueOf(userId), Role.ADMIN).orElseThrow(
                    () -> new OurException("something went wrong!")
            );

            response.setMessage("success");
            response.setRole(Role.ADMIN);
            response.setUser(utils.mapUserEntityToUserDTO(updatedUser));

        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred during changing role" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response changeUsername(String username, String changeName) {
        Response response = new Response();
        try {
            User user = taskService.findByUsername(username);
            String finalUsername = changeName.substring(1, changeName.length() - 1);
            user.setUsername(finalUsername);
            user = userRepository.save(user);
            response.setUser(utils.mapUserEntityToUserDTOWithoutTasks(user));
            response.setStatusCode(200);
            response.setMessage("successful");
        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setMessage("Error occurred during change username " + e.getMessage());
            response.setStatusCode(500);
        }
        return response;
    }

    @Override
    public Response AllUserName() {
        Response response = new Response();
        try {
            List<User> userList = userRepository.findAll();
            List<UsernamesDTO> usernamesDTOS = utils.mapUsernamesToUsernameDTO(userList);
            response.setUsernamesDTOList(usernamesDTOS);
            response.setMessage("success");
            response.setStatusCode(200);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("error occurred during fetching users " + e.getMessage());
        }
        return response;
    }
}
