package dev.treppmann.cere_os.security;

public class CurrentUser {

    private final String userId;

    public CurrentUser(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }
}