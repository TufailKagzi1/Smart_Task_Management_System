package com.tkagzi.stms.Repository;

import com.tkagzi.stms.Model.Enums.Role;
import com.tkagzi.stms.Model.Enums.Stage;
import com.tkagzi.stms.Model.Task;
import com.tkagzi.stms.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {

    @Query("SELECT t FROM Task t WHERE t.stage = :stage")
    List<Task> findByStage(@Param("stage") Stage stage);

    List<Task> findByAssignedTo(User user);

    List<Task> findByCreatedBy(String username);

    void deleteByAssignedTo(User user);
}
