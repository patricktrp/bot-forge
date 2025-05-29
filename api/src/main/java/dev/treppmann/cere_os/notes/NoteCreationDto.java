package dev.treppmann.cere_os.notes;

import java.util.Map;

public record NoteCreationDto(
        String title,
        Map<String, Object> content
) {}
