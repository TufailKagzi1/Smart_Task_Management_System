package com.tkagzi.stms.Repository;

import com.tkagzi.stms.Model.Note;
import com.tkagzi.stms.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note,Long> {
    List<Note> findByCreatedBy(User user);

    void deleteByCreatedBy(User user);
}
