package dev.treppmann.cere_os;

import dev.treppmann.cere_os.security.CurrentUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bots")
public class TestController {
    private final CurrentUser currentUser;

    public TestController(CurrentUser currentUser) {
        this.currentUser = currentUser;
    }

    @GetMapping
    public String test() {
        return currentUser.getUserId();
    }
}
