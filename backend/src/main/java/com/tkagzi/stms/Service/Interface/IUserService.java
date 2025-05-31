package com.tkagzi.stms.Service.Interface;

import com.tkagzi.stms.DTO.LoginRequest;
import com.tkagzi.stms.DTO.RegisterRequestDTO;
import com.tkagzi.stms.DTO.Response;
import com.tkagzi.stms.Model.User;
import org.springframework.stereotype.Service;

@Service
public interface IUserService {

    Response register(RegisterRequestDTO requestDTO);

    Response Login(LoginRequest loginRequest);

    Response getAllUsers();

    Response deleteUserById(String username);

    Response getUserById(String userId);

    Response getMyInfo(String username);

    Response updateUser(User user,String username);

    Response changeRole(String username,String userId);

    Response AllUserName();

    Response deleteUsername(String username);

    Response changeUsername(String username, String changeName);
}
