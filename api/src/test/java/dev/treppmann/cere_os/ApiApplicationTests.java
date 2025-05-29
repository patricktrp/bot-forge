package dev.treppmann.cere_os;

import com.tngtech.archunit.core.domain.JavaClass;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.modulith.core.ApplicationModules;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
class ApiApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void testApplicationModules() {
		var modules = ApplicationModules.of(ApiApplication.class, JavaClass.Predicates.resideInAPackage("dev.treppmann.cere_os.security")).verify();

		modules.forEach(System.out::println);
		modules.verify();
	}

}
