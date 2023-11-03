package com.example.todomvcbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class TodoMvcBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TodoMvcBackendApplication.class, args);
    }

}
