package com.tkagzi.stms.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.tkagzi.stms.Model.Enums.Role;
import com.tkagzi.stms.Model.Note;
import lombok.*;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Response {

    private int statusCode;
    private String message;
    private String token;
    private Role role;
    private String expirationTime;

    private UserDTO user;
    private TaskDTO task;
    private NoteResponseDTO noteResponseDTO;
    private List<NoteResponseDTO> noteResponseDTOList;
    private List<UserDTO> userList;
    private List<TaskDTO> taskList;
    private TaskOverviewDTO overviewDTO;
    private List<UsernamesDTO> usernamesDTOList;
}
