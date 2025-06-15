package com.tkagzi.stms.Utils;

import com.tkagzi.stms.DTO.*;
import com.tkagzi.stms.Model.Enums.Role;
import com.tkagzi.stms.Model.Note;
import com.tkagzi.stms.Model.Task;
import com.tkagzi.stms.Model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class Utils {

    //register new user 
    public User mapRegisterDTOToUserEntity(RegisterRequestDTO requestDTO){
        if (requestDTO.getRole() == null) requestDTO.setRole(Role.USER);

        return User.builder()
                .username(requestDTO.getUsername())
                .name(requestDTO.getName())
                .email(requestDTO.getEmail())
                .role(requestDTO.getRole())
                .password(requestDTO.getPassword())
                .bio("")
                .build();
    }

    public Task mapTaskRequestDTOToTaskEntity(TaskRequestDTO taskRequestDTO,User user){
        return Task.builder()
                .title(taskRequestDTO.getTitle())
                .description(taskRequestDTO.getDescription())
                .stage(taskRequestDTO.getStage())
                .priority(taskRequestDTO.getPriority())
                .createdAt(taskRequestDTO.getCreatedAt())
                .createdBy(taskRequestDTO.getCreatedBy())
                .assignedTo(user)
                .dueDate(taskRequestDTO.getDueDate())
                .build();
    }
    
    //map to user without setting Task List 
    public User mapUserDTOToUserEntityWithoutTasks(UserDTO userDTO){
        return User.builder()
                .id(userDTO.getId())
                .name(userDTO.getName())
                .username(userDTO.getUsername())
                .email(userDTO.getEmail())
                .role(userDTO.getRole())
                .bio(userDTO.getBio())
                .build();
    }

    public User mapUserDTOtoUserEntityWithTasks(UserDTO userDTO){
        List<Task> taskList = userDTO.getTaskList().stream().map(this::mapTaskDTOtoTaskEntityWithUser).toList();
        return User.builder()
                .id(userDTO.getId())
                .name(userDTO.getName())
                .username(userDTO.getUsername())
                .email(userDTO.getEmail())
                .tasks(taskList)
                .role(userDTO.getRole())
                .bio(userDTO.getBio())
                .build();
    }
    
    //map TaskDTO to Task Model
    public Task mapTaskDTOtoTaskEntityWithUser(TaskDTO taskDTO){
        return Task.builder()
                .id(taskDTO.getId())
                .title(taskDTO.getTitle())
                .description(taskDTO.getDescription())
                .createdBy(taskDTO.getCreatedBy())
                .createdAt(taskDTO.getCreatedAt())
                .dueDate(taskDTO.getDueDate())
                .assignedTo(mapUserDTOToUserEntityWithoutTasks(taskDTO.getAssignedTo()))
                .priority(taskDTO.getPriority())
                .stage(taskDTO.getStage())
                .build();
    }
    
    
    public UserDTO mapUserEntityToUserDTOWithoutTasks(User user){

        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .bio(user.getBio())
                .build();
    }

    public UserDTO mapUserEntityToUserDTO(User user){
        
        List<TaskDTO> taskDTOS = user.getTasks().stream()
                .map(this::mapTaskEntityToTaskDTO_withUser).collect(Collectors.toList());

        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .taskList(taskDTOS)
                .bio(user.getBio())
                .build();
    }
    
    public TaskDTO mapTaskEntityToTaskDTO_withUser(Task task){

        return TaskDTO.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .createdAt(task.getCreatedAt())
                .createdBy(task.getCreatedBy())
                .dueDate(task.getDueDate())
                .assignedTo(mapUserEntityToUserDTOWithoutTasks(task.getAssignedTo()))
                .stage(task.getStage())
                .priority(task.getPriority())
                .build();
                
    }

    public TaskDTO mapTaskEntityToTaskDTO_WithoutUser(Task task){

        return TaskDTO.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .createdAt(task.getCreatedAt())
                .createdBy(task.getCreatedBy())
                .dueDate(task.getDueDate())
                .assignedTo(mapUserEntityToUserDTOWithoutTasks(task.getAssignedTo()))
                .stage(task.getStage())
                .priority(task.getPriority())
                .build();

    }

    public List<Task> mapTaskListDTOToTaskListEntity(List<TaskDTO> taskDTOS){
        return taskDTOS.stream().map(this::mapTaskDTOtoTaskEntityWithUser).collect(Collectors.toList());
    }

    public List<TaskDTO> mapTaskListEntityToTaskListDTO(List<Task> tasks){
        return tasks.stream().map(this::mapTaskEntityToTaskDTO_withUser).toList();
    }

    public List<UserDTO> mapUserListEntityToUserListDTO(List<User> userList){
        return userList.stream()
                .map(this::mapUserEntityToUserDTO).collect(Collectors.toList());
    }

    public List<User> mapUserListDTOTOUserListEntity(List<UserDTO> userDTOList){
        return userDTOList.stream()
                .map(this::mapUserDTOtoUserEntityWithTasks).toList();
    }

    public List<TaskDTO> mapTwoTaskListsInOne(Response assignedTasks, Response createdTasks) {
        Set<TaskDTO> taskDTOSet = new LinkedHashSet<>();
        taskDTOSet.addAll(assignedTasks.getTaskList());  // Add assigned tasks
        taskDTOSet.addAll(createdTasks.getTaskList());   // Add created tasks
        return new ArrayList<>(taskDTOSet);              // Remove duplicates & maintain order
    }

    public List<UsernamesDTO> mapUsernamesToUsernameDTO(List<User> userList) {
        return userList.stream().map(this::usernameToDTOMapper).toList();
    }

    private UsernamesDTO usernameToDTOMapper(User user) {
        return UsernamesDTO.builder()
                .username(user.getUsername())
                .firstname(user.getName())
                .email(user.getEmail())
                .build();
    }

    public List<NoteResponseDTO> mapNoteListEntityToNoteResponseDTO(List<Note> notes) {
        return notes
                .stream().map(this::mapNoteEntityToNoteResponse)
                .toList();
    }

    public NoteResponseDTO mapNoteEntityToNoteResponse(Note note) {
        return NoteResponseDTO
                .builder()
                .id(note.getId())
                .username(note.getUsername())
                .title(note.getTitle())
                .note(note.getNote())
                .createAt(note.getCreateAt())
                .build();
    }
}
