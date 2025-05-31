package com.tkagzi.stms.Controller;

import com.tkagzi.stms.DTO.NoteRequestDTO;
import com.tkagzi.stms.DTO.Response;
import com.tkagzi.stms.Service.Interface.INoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/note")
public class NoteController {
    @Autowired
    private INoteService noteService;

    @GetMapping("api/created")
    public String create(){
        return "hello";
    }

    @PostMapping("/create")
    public ResponseEntity<Response> note(@RequestBody NoteRequestDTO note){
        System.out.println("new request"+note);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response response = noteService.createNote(username,note);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> noteById(@PathVariable("id")String id){
        Response response = noteService.getNoteById(id);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all")
    public ResponseEntity<Response> getAllNotes(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username= authentication.getName();
        Response response = noteService.getAllNotes(username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Response> deleteById(@PathVariable("id")String id){
        Response response = noteService.deleteNote(id);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/{noteId}")
    public ResponseEntity<Response> update(@PathVariable("noteId")String noteId, @RequestBody NoteRequestDTO note){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Response response = noteService.updateNote(username,noteId, note);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
