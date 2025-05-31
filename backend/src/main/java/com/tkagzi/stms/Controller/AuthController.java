package com.tkagzi.stms.Controller;

import com.tkagzi.stms.DTO.LoginRequest;
import com.tkagzi.stms.DTO.RegisterRequestDTO;
import com.tkagzi.stms.DTO.Response;
import com.tkagzi.stms.Service.Interface.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private IUserService userService;

    @PostMapping("/register")
    public ResponseEntity<Response> register(@RequestBody RegisterRequestDTO requestDTO){
        Response response = userService.register(requestDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody LoginRequest login){
        Response response = userService.Login(login);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}
