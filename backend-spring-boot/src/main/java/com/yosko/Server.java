package com.yosko;

import com.yosko.models.request.CategoryRequest;
import com.yosko.models.request.ProductRequest;
import com.yosko.models.request.ProductUpdateRequest;
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
            ProductRequest productRequest = new ProductRequest("t-shirt", 20D, "this is t-shirt", "Clothes", "img.png");
            ProductRequest productRequest2 = new ProductRequest("jacket", 25D, "jacket", "Clothes", "img.png");

            ProductUpdateRequest productUpdateRequest = new ProductUpdateRequest("jacketa", 2D, "jacketa", "Clothes", "img");

            categoryService.createCategory(categoryRequest, "en");
            productService.createProduct(productRequest, "en");
            productService.createProduct(productRequest2, "bg");
            productService.updateProduct(2, productUpdateRequest, "es");
        };
    }
}
