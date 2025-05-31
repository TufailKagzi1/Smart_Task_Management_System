package com.tkagzi.stms.Service.Implementation;

import com.tkagzi.stms.DTO.NoteRequestDTO;
import com.tkagzi.stms.DTO.NoteResponseDTO;
import com.tkagzi.stms.DTO.Response;
import com.tkagzi.stms.Exception.OurException;
import com.tkagzi.stms.Model.Note;
import com.tkagzi.stms.Model.User;
import com.tkagzi.stms.Repository.NoteRepository;
import com.tkagzi.stms.Repository.UserRepository;
import com.tkagzi.stms.Service.Interface.INoteService;
import com.tkagzi.stms.Utils.Utils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class NoteService implements INoteService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    private final Utils utils;

    public NoteService(NoteRepository noteRepository, UserRepository userRepository, Utils utils) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
        this.utils = utils;
    }

    @Override
    public Response getNoteById(String id) {
        Response response = new Response();
        try {
            Note byId = noteRepository.findById(Long.valueOf(id)).orElseThrow(
                    ()-> new OurException("task not found")
            );
            response.setNoteResponseDTO(utils.mapNoteEntityToNoteResponse(byId));
            response.setStatusCode(200);
            response.setMessage("successful");
        }catch (OurException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error occurred during fetching note "+e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllNotes(String username) {
        Response response = new Response();
        try {
            User user = findByUsername(username);
            List<Note> Notes = noteRepository.findByCreatedBy(user);
            List<NoteResponseDTO> noteDto = utils.mapNoteListEntityToNoteResponseDTO(Notes);
            response.setNoteResponseDTOList(noteDto);
            response.setStatusCode(200);
            response.setNoteResponseDTOList(noteDto);
        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error while fetching notes "+e.getMessage());
        }
        return response;
    }

    @Override
    public Response createNote(String username, NoteRequestDTO note) {
        Response response = new Response();
        try {
            User user = findByUsername(username);
            Note noteToSave = Note.builder()
                    .title(note.getTitle())
                    .note(note.getNote())
                    .createAt(LocalDate.now())
                    .username(username)
                    .createdBy(user)
                    .build();

            Note saved = noteRepository.save(noteToSave);
            response.setNoteResponseDTO(utils.mapNoteEntityToNoteResponse(saved));
            response.setStatusCode(200);
            response.setMessage("successful");
        }catch (OurException e){
            response.setStatusCode(200);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred during creating note "+e.getMessage());
        }
        return response;
    }

    public Response deleteNote(String id){
        Response response = new Response();
        try {
            noteRepository.deleteById(Long.valueOf(id));
            response.setMessage("successful");
            response.setStatusCode(200);
        } catch (OurException e) {
            response.setMessage(e.getMessage());
            response.setStatusCode(400);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred while deleting note "+e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateNote(String username, String noteId, NoteRequestDTO note) {
        Response response = new Response();
        try {
            Note db_note = noteRepository.findById(Long.valueOf(noteId)).orElseThrow(
                    ()-> new OurException("Note ID is invalid")
            );

            //check if the user is authenticated
            if (db_note.getUsername().equalsIgnoreCase(username)){
                db_note.setTitle(note.getTitle());
                db_note.setNote(note.getNote());
                Note savedNote = noteRepository.save(db_note);
                response.setNoteResponseDTO(utils.mapNoteEntityToNoteResponse(savedNote));
            } else {
                throw new OurException("you can not update this note");
            }
            response.setStatusCode(200);
            response.setMessage("successful");
        } catch (OurException e){
            response.setMessage(e.getMessage());
            response.setStatusCode(400);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred during updating task"+e.getMessage());
        }
        return response;
    }

    public User findByUsername(String username){
        return userRepository.findByUsername(username).orElseThrow(
                ()-> new OurException("user does not exists")
        );
    }
}
