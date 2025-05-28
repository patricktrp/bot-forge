package dev.treppmann.bot_forge.security;

public class CurrentUser {

    private final String userId;

    public CurrentUser(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }
}