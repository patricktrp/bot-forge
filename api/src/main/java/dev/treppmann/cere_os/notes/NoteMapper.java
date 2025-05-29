package dev.treppmann.cere_os.notes;

import org.springframework.stereotype.Component;

@Component
class NoteMapper {
    NoteDto toDto(Note note) {
        return new NoteDto(note.getId(), note.getTitle(), note.getContent(), note.getCreatedAt(), note.getUpdatedAt());
    }
}
