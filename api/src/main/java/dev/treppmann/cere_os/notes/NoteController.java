package dev.treppmann.cere_os.notes;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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
    public NoteDto createNote(@RequestBody @Validated NoteCreationDto noteCreationDto) {
        return noteService.crateNote(noteCreationDto);
    }

    @GetMapping("/{noteId}")
    public void getNote(@PathVariable Long noteId) {}

    @DeleteMapping("/{noteId}")
    public void deleteNote(@PathVariable Long noteId) {}

    @PatchMapping("/{noteId}")
    public void updateNote(@PathVariable Long noteId, @RequestBody @Validated NoteUpdateDto noteUpdateDto) {
        noteService.updateNote(noteId, noteUpdateDto);
    }
}
