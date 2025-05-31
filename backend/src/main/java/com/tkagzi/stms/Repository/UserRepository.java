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
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {


    boolean existsByEmail(String email);

    boolean existsByUsername(String email);

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u JOIN FETCH u.tasks WHERE u.id = :uid")
    Optional<User> findUserWithTasks(@Param("uid") Long id);

    @Modifying
    @Query("UPDATE User u SET u.role = :role where u.id = :userId")
    Optional<User> changeRole(@Param("userId") Long userId, @Param("role") Role role);

    @Query("SELECT u.name,u.username FROM User u")
    List<User> AllUsernamesAndNames();

}
