package dev.treppmann.cere_os.notes;

import dev.treppmann.cere_os.security.CurrentUser;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.List;

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

    NoteDto crateNote(NoteCreationDto noteCreationDto) {
        Note note = new Note();
        note.setUserId(currentUser.getUserId());
        note.setTitle(noteCreationDto.title());
        note.setContent(noteCreationDto.content());
        noteRepository.save(note);

        return noteMapper.toDto(note);
    }

    NoteDto updateNote(Long noteId, NoteUpdateDto noteUpdateDto) {
        eventPublisher.publishEvent(new NoteUpdateEvent(noteId, "adasdasdasd"));
        return null;
    }
}
