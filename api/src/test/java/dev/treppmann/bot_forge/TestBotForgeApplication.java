package dev.treppmann.bot_forge;

import org.springframework.boot.SpringApplication;

public class TestBotForgeApplication {

	public static void main(String[] args) {
		SpringApplication.from(BotForgeApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
