package dev.treppmann.cere_os.notes;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByUserId(UUID userId);
}
