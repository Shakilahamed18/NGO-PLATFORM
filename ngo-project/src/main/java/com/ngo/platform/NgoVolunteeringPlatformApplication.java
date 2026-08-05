package com.ngo.platform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.ngo.platform")
@EnableJpaRepositories(basePackages = "com.ngo.platform.repository")
@EntityScan(basePackages = "com.ngo.platform.model")
public class NgoVolunteeringPlatformApplication {
    public static void main(String[] args) {
        SpringApplication.run(NgoVolunteeringPlatformApplication.class, args);
    }
}