package com.tkagzi.stms.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.tkagzi.stms.Model.Enums.Role;
import lombok.Builder;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public class RegisterRequestDTO {

    private String name;
    private String username;
    private String email;
    private Role role;
    private String password;

}
