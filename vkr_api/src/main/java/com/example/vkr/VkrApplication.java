package com.example.vkr;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.vkr.Model.Role;
import com.example.vkr.Requests.RegisterRequest;
import com.example.vkr.auth.AuthenticationService;

@SpringBootApplication
public class VkrApplication {

	public static void main(String[] args) {
		SpringApplication.run(VkrApplication.class, args);
		
	}

	@Bean
	public CommandLineRunner commandLineRunner(
			AuthenticationService service
	) {
		return args -> {
			var admin = RegisterRequest.builder()
					.name("Admin")
					.email("admin@mail.com")
					.password("password")
					.role(Role.ADMIN)
					.build();
			System.out.println("Admin token: " + service.register(admin).getAccessToken());

			var moder = RegisterRequest.builder()
					.name("Moder")
					.email("moder@mail.com")
					.password("password")
					.role(Role.MODER)
					.build();
			System.out.println("Manager token: " + service.register(moder).getAccessToken());
		};
	}

}

