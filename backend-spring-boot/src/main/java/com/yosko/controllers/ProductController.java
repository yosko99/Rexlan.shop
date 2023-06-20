package com.yosko.controllers;

import com.yosko.entities.Product;
import com.yosko.services.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    @GetMapping()
    public List<Product> getProducts(
            @RequestParam(value = "qty", defaultValue = "20", required = false) int qty,
            @RequestParam(value = "currentLang", defaultValue = "en", required = false) String currentLang
    ) {
        return productService.getProducts(qty, currentLang);
    }
}
