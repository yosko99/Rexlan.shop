package com.yosko.services.service;

import com.yosko.entities.Category;
import com.yosko.models.CategoryRequest;
import com.yosko.models.CustomResponse;

import java.util.List;

public interface CategoryService {
    List<Category> getCategories(String currentLang);

    Category getCategory(String categoryName, String currentLang);

    CustomResponse createCategory(CategoryRequest categoryRequest, String currentLang);

    CustomResponse updateCategory(CategoryRequest categoryRequest, String currentLang);

    CustomResponse deleteCategory(String categoryName, String currentLang);

    Category createProvidedCategory(CategoryRequest categoryRequest, String currentLang);

    void updateProvidedCategory(CategoryRequest categoryRequest,String currentLang);

    void deleteEmptyCategory(String categoryName);

    Category retrieveCategory(String categoryName, String currentLang);
}
