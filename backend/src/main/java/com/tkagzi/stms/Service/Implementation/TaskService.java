package com.tkagzi.stms.Service.Implementation;

import com.tkagzi.stms.DTO.*;
import com.tkagzi.stms.Exception.OurException;
import com.tkagzi.stms.Model.Enums.Priority;
import com.tkagzi.stms.Model.Enums.Role;
import com.tkagzi.stms.Model.Enums.Stage;
import com.tkagzi.stms.Model.Task;
import com.tkagzi.stms.Model.User;
import com.tkagzi.stms.Repository.NoteRepository;
import com.tkagzi.stms.Repository.TaskRepository;
import com.tkagzi.stms.Repository.UserRepository;
import com.tkagzi.stms.Service.Interface.ITaskService;
import com.tkagzi.stms.Utils.Utils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService implements ITaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final NoteRepository noteRepository;
    private final Utils utils;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository, NoteRepository noteRepository, Utils utils) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.noteRepository = noteRepository;
        this.utils = utils;
    }

    @Override
    public Response createTask(TaskRequestDTO task,String username) {
        Response response = new Response();
        try{
            User user;
            if (task == null || task.getAssignedTo().isBlank()){
                throw new OurException("Invalid data! fill all the data");
            }

            user = userRepository.findByUsername(task.getAssignedTo()).orElseThrow(
                    () -> new OurException("Assign task to valid user!")
            );

            task.setCreatedAt(LocalDate.now());
            task.setStage(Stage.CREATED);
            task.setCreatedBy(username);

            if (!task.getDueDate().isAfter(LocalDate.now())){
                throw new OurException("invalid due date");
            }

            Task newTask = utils.mapTaskRequestDTOToTaskEntity(task,user);

            Task savedTask = taskRepository.save(newTask);

            response.setTask(utils.mapTaskEntityToTaskDTO_withUser(savedTask));
            response.setStatusCode(200);
            response.setMessage("Task created");

        }catch (OurException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error occurred during creating task "+e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateTask(Task task, String username, String taskId) {
        Response response = new Response();
        try{
            User user = new User();
            if (task == null || username.isBlank() || taskId.isBlank() ){
                throw new OurException("Invalid data! fill all the data");
            }

            user = userRepository.findByUsername(username).orElseThrow(
                    () -> new OurException("user does not exists")
            );

            Task taskDB = taskRepository.findById(Long.valueOf(taskId)).orElseThrow(
                    () -> new OurException("no task to found to be update")
            );

            if (!username.equalsIgnoreCase(user.getUsername())){
                    throw new OurException("you can not update the task!");
            }

            task.setId(taskDB.getId());
            task.setCreatedAt(taskDB.getCreatedAt());
            task.setCreatedBy(taskDB.getCreatedBy());
            task.setAssignedTo(taskDB.getAssignedTo());

            Task savedTask = taskRepository.save(task);

            response.setTask(utils.mapTaskEntityToTaskDTO_withUser(savedTask));
            response.setStatusCode(200);
            response.setMessage("Task Updated");

        }catch (OurException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error occurred during updating task "+e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteTask(String taskId,String username) {
        Response response = new Response();
        try {
            User user = findByUsername(username);
            Task task = taskRepository.findById(Long.valueOf(taskId)).orElseThrow(
                    () -> new OurException(taskId + "user does not exists")
            );

            if (!task.getCreatedBy().equalsIgnoreCase(user.getUsername())){
                throw new OurException("You can not delete "+task.getTitle());
            }

            taskRepository.delete(task);

            response.setStatusCode(200);
            response.setMessage("Task deleted");


        } catch (OurException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("error occurred during deleting task "+e.getMessage());
        }

        return response;
    }

    @Override
    public Response AllTaskForAdmin(String username) {

        Response response = new Response();
        try {
            User user = findByUsername(username);

            if (user.getRole() != Role.ADMIN){
                throw new OurException(user.getUsername() + " is authorized to access this data");
            }

            List<Task> taskList = taskRepository.findAll();
            List<TaskDTO> taskDTOS = utils.mapTaskListEntityToTaskListDTO(taskList);

            response.setStatusCode(200);
            response.setTaskList(taskDTOS);
            response.setMessage("success");

        } catch (OurException e){
            response.setMessage(e.getMessage());
            response.setStatusCode(400);
        } catch (Exception e){
            response.setMessage("error occurred during fetching tasks "+e.getMessage());
            response.setStatusCode(500);
        }

        return response;
    }

    @Override
    public Response createdTaskByStatus(String status, String username) {
        Stage stage = null;
        Response response = new Response();
        try {
            User user = findByUsername(username);

            if (!(status.equalsIgnoreCase("created") ||
                    status.equalsIgnoreCase("IN_PROGRESS") ||
                    status.equalsIgnoreCase("COMPLETED") )){
                throw new OurException("Invalid stage");
            }else {
                if (status.equalsIgnoreCase("created")) stage=Stage.CREATED;
                if (status.equalsIgnoreCase("IN_PROGRESS")) stage=Stage.IN_PROGRESS;
                if (status.equalsIgnoreCase("COMPLETED")) stage = Stage.COMPLETED;
            }


            List<Task> taskList = taskRepository.findByCreatedBy(user.getUsername());

            Stage finalStage = stage;
            List<Task> filteredList = taskList.stream().filter(task -> task.getStage().equals(finalStage)).toList();


            response.setTaskList(utils.mapTaskListEntityToTaskListDTO(filteredList));
            response.setMessage("success");
            response.setStatusCode(200);

        } catch (OurException e){
            response.setMessage(e.getMessage());
            response.setStatusCode(400);
        } catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("error occurred during fetching task by stage"+e.getMessage());
        }
        return response;
    }

    @Override
    public Response createdTaskByPriority(String priority, String username) {
        Response response = new Response();
        Priority p =null;
        try {
            User user = findByUsername(username);

            if (priority.isEmpty() || !(priority.equalsIgnoreCase("LOW")
                    || priority.equalsIgnoreCase("MEDIUM")
                    || priority.equalsIgnoreCase("HIGH"))){
                throw new OurException("Invalid priority");
            }else {
                if (priority.equalsIgnoreCase("LOW")) p = Priority.LOW;
                if (priority.equalsIgnoreCase("MEDIUM")) p = Priority.MEDIUM;
                if (priority.equalsIgnoreCase("HIGH")) p = Priority.HIGH;
            }

            List<Task> taskList = taskRepository.findByCreatedBy(user.getUsername());

            Priority finalP = p;
            List<Task> filteredList = taskList.stream().filter(task -> task.getPriority().equals(finalP)).toList();

            response.setTaskList(utils.mapTaskListEntityToTaskListDTO(filteredList));
            response.setMessage("success");
            response.setStatusCode(200);

        }catch (OurException e){
            response.setMessage(e.getMessage());
            response.setStatusCode(400);
        } catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("error occurred during fetching task by priority"+ e.getMessage());
        }

        return response;
    }

    @Override
        public Response assignedTasks(String username) {
        Response response =new Response();
        try {
            User user = findByUsername(username);
            List<Task> byAssignedTo = taskRepository.findByAssignedTo(user);

            if (!byAssignedTo.isEmpty()) {
                List<TaskDTO> taskDTOS = utils.mapTaskListEntityToTaskListDTO(byAssignedTo);
                response.setTaskList(taskDTOS);
            }else {
                response.setTaskList(new ArrayList<>());
            }
            response.setMessage("successful");

            response.setStatusCode(200);

        }catch (OurException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error Occurred During getting User's Tasks " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response createdTasks(String username) {
        Response response =new Response();
        try {

            List<Task> tasks = taskRepository.findByCreatedBy(username);
            if (!tasks.isEmpty()) {
                List<TaskDTO> taskDTOS = utils.mapTaskListEntityToTaskListDTO(tasks);
                response.setTaskList(taskDTOS);
            }else {
                response.setTaskList(new ArrayList<>());
            }
            response.setStatusCode(200);
            response.setMessage("successful");

        }catch (OurException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error Occurred During fetching created tasks " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response fetchAllTasksOfUser(String username) {
        Response response = new Response();
        try {
            User user = findByUsername(username);
            Response assignedTasks = assignedTasks(username);
            Response createdTasks = createdTasks(username);

            List<TaskDTO> taskDTOList = utils.mapTwoTaskListsInOne(assignedTasks, createdTasks);
            response.setTaskList(taskDTOList);
            response.setStatusCode(200);
            response.setMessage("successful");
        }catch (OurException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error Occurred During fetching all tasks"+e.getMessage());
        }
        return response;
    }

    @Override
    public Response findTaskById(String taskId, String username) {
        Response response = new Response();
        try {
            User user = findByUsername(username);
            Task task = taskRepository.findById(Long.valueOf(taskId)).orElseThrow(
                    () -> new OurException("Invalid task id")
            );

            //check if the user has permission to access the task
            if(task.getAssignedTo().equals(user) || task.getCreatedBy().equalsIgnoreCase(username)){
                TaskDTO taskDTO = utils.mapTaskEntityToTaskDTO_withUser(task);
                response.setTask(taskDTO);
                response.setStatusCode(200);
                response.setMessage("successful");
            }else {
                response.setStatusCode(401);
                response.setMessage("Unauthorized Access");
            }

        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setMessage("Error while fetching task "+e.getMessage());
            response.setStatusCode(500);
        }
        return response;
    }

    @Override
    public Response getOverview(String username) {
        Response response = new Response();
        try {
            User user = findByUsername(username);

            List<Task> assignedTo = taskRepository.findByAssignedTo(user);

            int totalTask = 0;
            int completedTask = 0;
            int overdueTask = 0;
            int remaing = 0;

            if (!assignedTo.isEmpty()){
                for (Task t : assignedTo){
                    totalTask+=1;
                    if (t.getStage().equals(Stage.COMPLETED)){
                        completedTask+=1;
                    }else {
                        remaing+=1;
                    }
                    if (!t.getStage().equals(Stage.COMPLETED) && !(t.getDueDate().isAfter(LocalDate.now()))) overdueTask+=1;
                }
            }
            TaskOverviewDTO overviewDTO = TaskOverviewDTO.builder().totalTasks(totalTask).completedTasks(completedTask).remainingTasks(remaing).overDueTask(overdueTask).build();
            response.setOverviewDTO(overviewDTO);
            response.setStatusCode(200);
            response.setMessage("successful");
        }catch (OurException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error during creating statistics : " + e.getMessage());
        }
        return response;
    }

    @Override
    public boolean deleteUserTasks(User user) {
        try {
            List<Task> created = taskRepository.findByCreatedBy(user.getUsername());
            taskRepository.deleteAll(created);
            List<Task> assignedTo = taskRepository.findByAssignedTo(user);
            taskRepository.deleteAll(assignedTo);
            noteRepository.deleteByCreatedBy(user);
        } catch (Exception e){
            System.out.println(e.getMessage());
            return false;
        }
        return true;
    }

    @Override
    public Response completeTask(String taskId, String username,boolean complete) {
        Response response =new Response();
        try {
            User user = findByUsername(username);

            Task task = taskRepository.findById(Long.valueOf(taskId)).orElseThrow(
                    ()-> new OurException("task does not exists")
            );
            System.out.println(task.getAssignedTo().getUsername());
            System.out.println(task.getCreatedBy());
            System.out.println(username);

            if (!((task.getCreatedBy().equals(username)) || (task.getAssignedTo().getUsername().equals(username)))){
                throw new OurException("you have no authority to change stage of "+task.getTitle());
            }

            if (complete) {
                task.setStage(Stage.COMPLETED);
            }else {
                task.setStage(Stage.IN_PROGRESS);
            }
            Task save = taskRepository.save(task);

            response.setTask(utils.mapTaskEntityToTaskDTO_WithoutUser(save));
            response.setStatusCode(200);
            response.setMessage("successful");

        }catch (OurException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error Occurred updating task status" + e.getMessage());
        }
        return response;
    }

    public User findByUsername(String username){
        return userRepository.findByUsername(username).orElseThrow(
                ()-> new OurException("user does not exists")
        );
    }
}
