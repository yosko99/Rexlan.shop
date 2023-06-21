package com.yosko.controllers;

import com.yosko.dtos.dto.ProductDTO;
import com.yosko.models.CustomResponse;
import com.yosko.models.ProductUpdateRequest;
import com.yosko.services.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    @GetMapping()
    public List<ProductDTO> getProducts(
            @RequestParam(value = "qty", defaultValue = "20", required = false) int qty,
            @RequestParam(value = "currentLang", defaultValue = "en", required = false) String currentLang) {
        return productService.getProducts(qty, currentLang);
    }

    @GetMapping(value = "/{id}")
    public ProductDTO getProduct(
            @PathVariable long id,
            @RequestParam(value = "currentLang", defaultValue = "en", required = false) String currentLang) {
        return productService.getProduct(id, currentLang);
    }

    @PutMapping("/{id}")
    public CustomResponse updateProduct(
            @PathVariable long id,
            @RequestBody @Valid ProductUpdateRequest request,
            @RequestParam(value = "currentLang", defaultValue = "en", required = false) String currentLang) {
        return productService.updateProduct(id, request, currentLang);
    }
}
