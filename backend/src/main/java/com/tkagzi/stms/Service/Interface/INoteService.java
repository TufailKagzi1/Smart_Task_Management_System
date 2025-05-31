package com.tkagzi.stms.Service.Interface;

import com.tkagzi.stms.DTO.NoteRequestDTO;
import com.tkagzi.stms.DTO.Response;

public interface INoteService {
    Response createNote(String username, NoteRequestDTO note);

    Response getNoteById(String id);

    Response getAllNotes(String username);

    Response deleteNote(String id);

    Response updateNote(String username, String noteId, NoteRequestDTO note);
}
