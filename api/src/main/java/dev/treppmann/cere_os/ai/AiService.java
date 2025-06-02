package dev.treppmann.cere_os.ai;

import dev.treppmann.cere_os.notes.events.NoteDeletionEvent;
import dev.treppmann.cere_os.notes.events.NoteUpdateEvent;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.document.Document;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.ai.vectorstore.filter.Filter;
import org.springframework.ai.vectorstore.filter.FilterExpressionBuilder;
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
    private final TokenTextSplitter splitter;

    @ApplicationModuleListener
    public void handleNoteUpdate(NoteUpdateEvent event) {
        FilterExpressionBuilder builder = new FilterExpressionBuilder();
        Filter.Expression expr = builder.eq("noteId", event.noteId()).build();
        vectorStore.delete(expr);
        Document document = new Document(event.content(), Map.of("noteId", event.noteId(), "userId", event.userId()));
        List<Document> chunks = splitter.split(document);
        vectorStore.add(chunks);
        log.info("vector embedded successfully");
    }

    @ApplicationModuleListener
    public void handleNoteDeletion(NoteDeletionEvent event) {
        FilterExpressionBuilder builder = new FilterExpressionBuilder();
        Filter.Expression expr = builder.eq("noteId", event.noteId()).build();
        vectorStore.delete(expr);
    }
}
