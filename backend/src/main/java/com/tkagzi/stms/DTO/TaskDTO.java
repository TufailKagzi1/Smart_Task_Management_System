package com.tkagzi.stms.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.tkagzi.stms.Model.Enums.Priority;
import com.tkagzi.stms.Model.Enums.Stage;
import com.tkagzi.stms.Model.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public class TaskDTO {

    private Long id;
    private String title;
    private String description;
    private Priority priority;
    private Stage stage;
    private String createdBy;
    private LocalDate createdAt;
    private LocalDate dueDate;

    private UserDTO assignedTo;

}
