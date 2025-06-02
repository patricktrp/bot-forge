package dev.treppmann.cere_os.notes;

import dev.treppmann.cere_os.notes.events.NoteDeletionEvent;
import dev.treppmann.cere_os.notes.events.NoteUpdateEvent;
import dev.treppmann.cere_os.security.CurrentUser;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
class NoteService {
    private final NoteRepository noteRepository;
    private final NoteMapper noteMapper;
    private final ApplicationEventPublisher eventPublisher;
    private final CurrentUser currentUser;

    List<NoteDto> getNotes() {
        return noteRepository.findByUserId(currentUser.getUserId()).stream().map(noteMapper::toDto).toList();
    }

    NoteDto getNote(Long noteId) {
        Note note = fetchNoteAndAssertOwnership(noteId);
        return noteMapper.toDto(note);
    }

    NoteDto createNote(NoteCreationDto noteCreationDto) {
        Note note = new Note();
        note.setUserId(currentUser.getUserId());
        note.setTitle(noteCreationDto.title());
        note.setContent(noteCreationDto.content());

        noteRepository.save(note);
        eventPublisher.publishEvent(new NoteUpdateEvent(note.getId(), currentUser.getUserId(), note.getTitle()));

        return noteMapper.toDto(note);
    }

    NoteDto updateNote(Long noteId, NoteUpdateDto noteUpdateDto) {
        Note note = fetchNoteAndAssertOwnership(noteId);

        note.setTitle(noteUpdateDto.title());
        note.setContent(noteUpdateDto.content());

        noteRepository.save(note);
        eventPublisher.publishEvent(new NoteUpdateEvent(noteId, currentUser.getUserId(), noteUpdateDto.rawContent()));

        return noteMapper.toDto(note);
    }

    void deleteNote(Long noteId) {
        Note note = fetchNoteAndAssertOwnership(noteId);

        noteRepository.delete(note);
        eventPublisher.publishEvent(new NoteDeletionEvent(noteId));
    }

    private Note fetchNoteAndAssertOwnership(Long noteId) {
        Note note = noteRepository.findById(noteId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Note with id %d not found", noteId)));
        assertOwnership(note, currentUser.getUserId());

        return note;
    }

    private void assertOwnership(Note note, UUID userId) {
        if (!note.getUserId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }
}
