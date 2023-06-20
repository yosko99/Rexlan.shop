package com.yosko;

import com.yosko.entities.*;
import com.yosko.models.CategoryRequest;
import com.yosko.models.ProductRequest;
import com.yosko.services.service.CategoryService;
import com.yosko.services.service.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Server {
    public static void main(String[] args) {
        SpringApplication.run(Server.class, args);
    }

    @Bean
    CommandLineRunner run(ProductService productService, CategoryService categoryService) {
        return args -> {
            CategoryRequest categoryRequest = new CategoryRequest("Clothes", "clothes.png");
            ProductRequest productRequest = new ProductRequest("t-shirt", 20, "this is t-shirt", "Clothes", "img.png");

            categoryService.createCategory(categoryRequest, "en");
            productService.createProduct(productRequest, "en");
        };
    }
}
