package com.tkagzi.stms;

import com.tkagzi.stms.Model.User;
import com.tkagzi.stms.Repository.TaskRepository;
import com.tkagzi.stms.Repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

@SpringBootTest
class StemsApplicationTests {
	@Autowired
	UserRepository userRepository;
	@Autowired
	TaskRepository taskRepository;

	@Test
	void contextLoads() {
	}

	@Test
	void fetchNames(){
		List<String> userList = userRepository.AllUsersFirstName();
		System.out.println(userList);
	}

	@Test
	void fetchTasksByUser() {
		User username = userRepository.findById(2L).orElse(new User());

		System.out.println(taskRepository.findByAssignedTo(username));
	}
}
