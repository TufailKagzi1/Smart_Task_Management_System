package com.tkagzi.stms.Repository;

import com.tkagzi.stms.DTO.Response;
import com.tkagzi.stms.Exception.OurException;
import com.tkagzi.stms.Model.Enums.Priority;
import com.tkagzi.stms.Model.Enums.Stage;
import com.tkagzi.stms.Model.Task;
import com.tkagzi.stms.Model.User;
import com.tkagzi.stms.Utils.Utils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@SpringBootTest
class TaskRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private Utils utils;



    @Test
    public void feedData(){
        User user = userRepository.findById(1L).get();

        LocalDate obj = LocalDate.now();
        LocalDate date = LocalDate.now().plusMonths(2);
        Task task = Task.builder()
                .title("Create Spring boot app")
                .description("With REST API")
                .createdAt(obj)
                .createdBy(user.getUsername())
                .assignedTo(user)
                .dueDate(date)
                .stage(Stage.CREATED)
                .priority(Priority.MEDIUM)
                .build();
        LocalDate date2 = LocalDate.now().plusYears(1);
        Task task2 = Task.builder()
                .title("Employment duration")
                .description("Must serve 1 year time period")
                .createdAt(obj)
                .createdBy(user.getUsername())
                .assignedTo(user)
                .dueDate(date2)
                .stage(Stage.IN_PROGRESS)
                .priority(Priority.LOW)
                .build();
        LocalDate date3 = LocalDate.now().plusDays(10);
        Task task3 = Task.builder()
                .title("Learn fundamentals of Node js")
                .description("May have to create application in node js")
                .createdAt(obj)
                .createdBy(user.getUsername())
                .assignedTo(user)
                .dueDate(date3)
                .stage(Stage.CREATED)
                .priority(Priority.HIGH)
                .build();
        taskRepository.saveAll(List.of(task,task2,task3));
    }

    @Test
    public void completedTask(){
        Optional<User> save = userRepository.findById(1L);
        System.out.println("save = " + save);

    }

    @Test
    public void fetchTask(){

        User u1 = userRepository.findById(1L).get();
        List<Task> byId = taskRepository.findByAssignedTo(u1);

        System.out.println("byId = " + byId);

    }

    @Test
    public void fetchAll(){
//        completedTask();


        Optional<User> userWithTasks = userRepository.findUserWithTasks(1L);
        System.out.println("all = " + userWithTasks);
        for (Task t: userWithTasks.get().getTasks()){
            System.out.println("t = " + t);
        }
//         ||
    }

   @Test
    public void getTasksByUserId() {
        getTaskAssignedbyme("high","1");
       System.out.println("*********************************");
       getTaskAssignedbyme("MEDIUM","1");
       System.out.println("*********************************");
       getTaskAssignedbyme("MEDIUM","1");

    }

    @Test
    public void getTaskAssignedbyme(String priority, String userId) {
        Response response = new Response();
        Priority p = null;
        try {
            User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(
                    () -> new OurException("user does not exists")
            );

            if (priority.isEmpty() || !(priority.equalsIgnoreCase("LOW")
                    || priority.equalsIgnoreCase("MEDIUM")
                    || priority.equalsIgnoreCase("HIGH"))) {
                throw new OurException("Invalid priority");
            } else {
                if (priority.equalsIgnoreCase("LOW")) p = Priority.LOW;
                if (priority.equalsIgnoreCase("MEDIUM")) p = Priority.MEDIUM;
                if (priority.equalsIgnoreCase("HIGH")) p = Priority.HIGH;
            }

            List<Task> taskList = taskRepository.findByCreatedBy(user.getUsername());

            Priority finalP = p;
            List<Task> filteredList = taskList.stream().filter(task -> task.getPriority().equals(finalP)).toList();
            System.out.println("filteredList = " + filteredList);
            response.setTaskList(utils.mapTaskListEntityToTaskListDTO(filteredList));
            response.setMessage("success");
            response.setStatusCode(200);
        } catch (Exception e){
            System.out.println("e = " + e.getMessage());
        }

        System.out.println(response);
    }

}