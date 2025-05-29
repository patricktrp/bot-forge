package dev.treppmann.cere_os.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.context.annotation.RequestScope;

@Configuration
public class CurrentUserConfig {

    @Bean
    @RequestScope
    public CurrentUser currentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth instanceof JwtAuthenticationToken jwtAuth
                && jwtAuth.getDetails() instanceof CurrentUser user) {
            return user;
        }

        throw new IllegalStateException("No authenticated CurrentUser in context");
    }
}