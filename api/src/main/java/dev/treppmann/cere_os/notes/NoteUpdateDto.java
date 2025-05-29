package dev.treppmann.cere_os.notes;

import java.util.Map;

record NoteUpdateDto(
        String title,
        Map<String, Object> content
) {}

