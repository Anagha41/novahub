package com.project.event;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class WebConfig implements  WebMvcConfigurer {
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
	registry.addMapping("/**") // Allow all endpoints
	.allowedOrigins("http://localhost:3000")// Allow requests from this origin
	.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")// Allowed HTTP methods
	.allowedHeaders("*") // Allow all headers
	.allowCredentials(true); // Allow cookies and authentication headers
	}

}