package com.books.library.Configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class AppConfig {
    @Bean
    fun corsConfigurer(): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                registry.addMapping("/api/persons/**") // Update with the appropriate endpoint path
                    .allowedOrigins("http://localhost:4200", "http://167.99.47.126:2000") // Update with the correct origin URL of your Angular app
                    .allowedMethods("*")
                    .allowedHeaders("*")
            }
        }
    }


}