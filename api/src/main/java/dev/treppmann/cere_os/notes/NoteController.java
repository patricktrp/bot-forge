package dev.treppmann.cere_os.notes;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/notes")
@Slf4j
@RequiredArgsConstructor
class NoteController {
    private final NoteService noteService;

    @GetMapping
    public List<NoteDto> getNotes() {
        return noteService.getNotes();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public NoteDto createNote(@RequestBody @Valid NoteCreationDto noteCreationDto) {
        return noteService.createNote(noteCreationDto);
    }

    @GetMapping("/{noteId}")
    public NoteDto getNote(@PathVariable Long noteId) {
        return noteService.getNote(noteId);
    }

    @DeleteMapping("/{noteId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteNote(@PathVariable Long noteId) {
        noteService.deleteNote(noteId);
    }

    @PatchMapping("/{noteId}")
    public NoteDto updateNote(@PathVariable Long noteId, @RequestBody @Valid NoteUpdateDto noteUpdateDto) {
        return noteService.updateNote(noteId, noteUpdateDto);
    }
}
