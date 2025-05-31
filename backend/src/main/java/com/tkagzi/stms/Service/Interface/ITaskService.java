package com.tkagzi.stms.Service.Interface;

import com.tkagzi.stms.DTO.Response;
import com.tkagzi.stms.DTO.TaskRequestDTO;
import com.tkagzi.stms.Model.Task;
import com.tkagzi.stms.Model.User;

public interface ITaskService {
    Response createTask(TaskRequestDTO task,String username);

    Response updateTask(Task task, String username, String taskId);

    Response deleteTask(String taskId,String username);

    Response AllTaskForAdmin(String username);

    Response createdTaskByStatus(String status, String username);

    Response createdTaskByPriority(String priority, String username);

    Response assignedTasks(String username);

    Response createdTasks(String username);

    Response completeTask(String taskId,String username, boolean complete);

    Response findTaskById(String taskId, String username);

    Response fetchAllTasksOfUser(String username);

    Response getOverview(String username);

    boolean deleteUserTasks(User user);
}
