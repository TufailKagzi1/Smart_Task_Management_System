package com.tkagzi.stms.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NoteResponseDTO {
    private Long id;
    private String title;
    private String note;
    private LocalDate createAt;
    private String username;
}
