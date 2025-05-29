package dev.treppmann.cere_os.notes.events;

import java.util.UUID;

public record NoteUpdateEvent(Long noteId, UUID userId, String content) {
}
