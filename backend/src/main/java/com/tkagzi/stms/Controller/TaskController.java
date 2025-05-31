package com.tkagzi.stms.Controller;

import com.tkagzi.stms.DTO.Response;
import com.tkagzi.stms.DTO.TaskRequestDTO;
import com.tkagzi.stms.Model.Task;
import com.tkagzi.stms.Service.Interface.ITaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private ITaskService taskService;

    @PostMapping("/create")
    public ResponseEntity<Response> createTask(@RequestBody TaskRequestDTO taskRequestDTO){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response response = taskService.createTask(taskRequestDTO,username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/update/{taskId}")
    public ResponseEntity<Response> updateTask(@RequestBody Task task,
                                               @PathVariable("taskId")String taskId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();
        Response response = taskService.updateTask(task,name,taskId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("delete/{taskId}")
    public ResponseEntity<Response> deleteTask(@PathVariable("taskId") String taskId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response response = taskService.deleteTask(taskId,username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all-tasks")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> allTaskAdmin(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();
        Response response = taskService.AllTaskForAdmin(name);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<Response> taskByStatus(@PathVariable("status")String status){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response response = taskService.createdTaskByStatus(status, username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/priority/{priority}")
    public ResponseEntity<Response> taskByPriority(@PathVariable("priority")String priority){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response response = taskService.createdTaskByPriority(priority,username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/assigned")
    public ResponseEntity<Response> myTasks(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response response = taskService.assignedTasks(username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/created")
    public ResponseEntity<Response> taskCreatedByUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response response = taskService.createdTasks(username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    //completed task
    @PostMapping("/complete/{taskId}")
    public ResponseEntity<Response> completedTask(@PathVariable("taskId")String taskId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response response = taskService.completeTask(taskId,username,true);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/process/{taskId}")
    public ResponseEntity<Response> processTask(@PathVariable("taskId")String taskId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response response = taskService.completeTask(taskId,username,false);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<Response> findTaskById(@PathVariable("taskId") String taskId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response response = taskService.findTaskById(taskId,username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/my-tasks")
    public ResponseEntity<Response> fetchAllTasksOfUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response response = taskService.fetchAllTasksOfUser(username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/overview")
    public ResponseEntity<Response> Overview(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response response = taskService.getOverview(username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
