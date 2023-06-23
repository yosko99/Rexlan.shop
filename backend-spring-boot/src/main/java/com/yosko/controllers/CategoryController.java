package com.yosko.controllers;

import com.yosko.entities.Category;
import com.yosko.models.CategoryRequest;
import com.yosko.models.CustomResponse;
import com.yosko.services.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public List<Category> getCategories(
            @RequestParam(value = "currentLang", defaultValue = "en", required = false) String currentLang) {
        return categoryService.getCategories(currentLang);
    }

    @GetMapping("/{id}")
    public Category getCategory(
            @PathVariable long id,
            @RequestParam(value = "currentLang", defaultValue = "en", required = false) String currentLang) {
        return categoryService.getCategory(id, currentLang);
    }

    @PutMapping("/{id}")
    public CustomResponse updateCategory(
            @PathVariable long id,
            @RequestBody @Valid CategoryRequest request,
            @RequestParam(value = "currentLang", defaultValue = "en", required = false) String currentLang) {
        return categoryService.updateCategory(id, request, currentLang);
    }

    @DeleteMapping("/{id}")
    public CustomResponse updateCategory(
            @PathVariable long id,
            @RequestParam(value = "currentLang", defaultValue = "en", required = false) String currentLang) {
        return categoryService.deleteCategory(id, currentLang);
    }

    @PostMapping
    public CustomResponse updateCategory(
            @RequestBody @Valid CategoryRequest request,
            @RequestParam(value = "currentLang", defaultValue = "en", required = false) String currentLang) {
        return categoryService.createCategory(request, currentLang);
    }
}
