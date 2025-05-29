package dev.treppmann.cere_os.notes;

import java.time.OffsetDateTime;
import java.util.Map;

record NoteDto(Long id, String title, Map<String, Object> content, OffsetDateTime created_at, OffsetDateTime updated_at) {
}
