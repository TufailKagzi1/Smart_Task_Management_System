package com.tkagzi.stms.Controller;

import com.tkagzi.stms.DTO.Response;
import com.tkagzi.stms.Model.User;
import com.tkagzi.stms.Service.Interface.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private IUserService userService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<Response> getAllUsers(){
        Response response = userService.getAllUsers();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/delete/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteUserById(@PathVariable("userId")String userId){
        Response response = userService.deleteUserById(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Response> deleteUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response response = userService.deleteUsername(username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/my-info")
    public ResponseEntity<Response> getLoggedInUserProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response response = userService.getMyInfo(username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/search/{userId}")
    public ResponseEntity<Response> getUserById(@PathVariable("userId")String userId){
        Response response = userService.getUserById(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/update")
    public ResponseEntity<Response> updateUser(@RequestBody User user){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response response = userService.updateUser(user,username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("role/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> changeRole(@PathVariable("userId") String userId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response response = userService.changeRole(username,userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/names")
    public ResponseEntity<Response> getAllUsername(){
        Response response =userService.AllUserName();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/username")
    public ResponseEntity<Response> changeUsername(@RequestBody String changeName){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response response = userService.changeUsername(username,changeName);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
