package com.yosko.controllers;

import com.yosko.dtos.dto.ProductDTO;
import com.yosko.entities.Product;
import com.yosko.enums.ProductSortingType;
import com.yosko.models.response.CustomResponse;
import com.yosko.models.request.ProductRequest;
import com.yosko.models.request.ProductUpdateRequest;
import com.yosko.services.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products/")
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public List<ProductDTO> getProducts(
            @RequestParam(value = "qty", defaultValue = "20", required = false) int qty,
            @RequestParam(value = "lang", defaultValue = "en", required = false) String currentLang) {
        return productService.getProducts(qty, currentLang);
    }

    @GetMapping(value = "/{id}")
    public ProductDTO getProduct(
            @PathVariable long id,
            @RequestParam(value = "lang", defaultValue = "en", required = false) String currentLang) {
        return productService.getProduct(id, currentLang);
    }

    @GetMapping(value = "/category/{category}")
    public List<ProductDTO> getProductsByCategory(
            @PathVariable String category,
            @RequestParam(value = "qty", defaultValue = "20", required = false) int qty,
            @RequestParam(value = "lang", defaultValue = "en", required = false) String currentLang) {
        return productService.getProductsByCategory(qty, category, currentLang);
    }

    @GetMapping(value = "/sort/{productAttribute}")
    public List<ProductDTO> getProductsSortedByAttribute(
            @PathVariable ProductSortingType productAttribute,
            @RequestParam(value = "qty", defaultValue = "20", required = false) int qty,
            @RequestParam(value = "lang", defaultValue = "en", required = false) String currentLang) {
        return productService.getProductsSortedByAttribute(qty, productAttribute, currentLang);
    }

    @GetMapping(value = "/regex/{pattern}")
    public List<ProductDTO> getProductsByPattern(
            @PathVariable String pattern,
            @RequestParam(value = "lang", defaultValue = "en", required = false) String currentLang) {
        return productService.getProductsByQueryString(pattern, currentLang);
    }

    @PutMapping("/{id}")
    public CustomResponse updateProduct(
            @PathVariable long id,
            @RequestBody @Valid ProductUpdateRequest request,
            @RequestParam(value = "lang", defaultValue = "en", required = false) String currentLang) {
        return productService.updateProduct(id, request, currentLang);
    }

    @DeleteMapping("/{id}")
    public CustomResponse deleteProduct(
            @PathVariable long id,
            @RequestParam(value = "lang", defaultValue = "en", required = false) String currentLang) {
        return productService.deleteProduct(id, currentLang);
    }

    @PostMapping
    public Product createProduct(
            @RequestBody @Valid ProductRequest request,
            @RequestParam(value = "lang", defaultValue = "en", required = false) String currentLang) {
        return productService.createProduct(request, currentLang);
    }
}
