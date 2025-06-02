package dev.treppmann.cere_os.notes;

import com.fasterxml.jackson.databind.JsonNode;

import java.util.Map;

record NoteUpdateDto(
        String title,
        Map<String, Object> content,
        String rawContent
) {}

