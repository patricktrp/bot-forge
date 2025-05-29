package dev.treppmann.cere_os.security;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Getter
@RequiredArgsConstructor
public class CurrentUser {
    private final UUID userId;
}