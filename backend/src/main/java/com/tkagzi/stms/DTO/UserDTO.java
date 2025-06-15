package com.tkagzi.stms.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.tkagzi.stms.Model.Enums.Role;
import com.tkagzi.stms.Model.Task;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public class UserDTO {

    private Long id;
    private String name;
    private String username;
    private String email;
    private Role role;
    private String bio;

    private List<TaskDTO> taskList;

}
