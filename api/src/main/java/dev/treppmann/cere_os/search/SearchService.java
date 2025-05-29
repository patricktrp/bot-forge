package dev.treppmann.cere_os.search;

import dev.treppmann.cere_os.notes.NoteUpdateEvent;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Service;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
class SearchService {
    @ApplicationModuleListener
    public void on(NoteUpdateEvent event) {
        log.info("Received NoteUpdateEvent: {}", event);
    }
}
