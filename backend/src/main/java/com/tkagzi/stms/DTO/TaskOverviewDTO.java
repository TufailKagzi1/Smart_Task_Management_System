package com.tkagzi.stms.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TaskOverviewDTO {
    int totalTasks;
    int remainingTasks;
    int completedTasks;
    int overDueTask;
}
