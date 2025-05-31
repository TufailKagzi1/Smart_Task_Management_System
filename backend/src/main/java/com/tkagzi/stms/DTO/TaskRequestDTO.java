package com.tkagzi.stms.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.tkagzi.stms.Model.Enums.Priority;
import com.tkagzi.stms.Model.Enums.Stage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Builder
@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TaskRequestDTO {


    private String title;
    private String description;
    private Priority priority;
    private Stage stage;
    private String createdBy;
    private LocalDate createdAt;
    private LocalDate dueDate;

    private String assignedTo;
}
