package dev.treppmann.cere_os.ai;

import dev.treppmann.cere_os.notes.NoteUpdateEvent;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
class AiService {
    private final VectorStore vectorStore;

    @ApplicationModuleListener
    public void on(NoteUpdateEvent event) {
        log.info("Received NoteUpdateEvent: {}", event);
        Document document = new Document(event.content(), Map.of("noteId", event.noteId()));
        vectorStore.add(List.of(document));
        log.info("successfully embedded doc");
    }
}
