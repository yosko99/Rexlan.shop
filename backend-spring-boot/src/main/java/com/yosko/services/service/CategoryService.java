package com.yosko.services.service;

import com.yosko.entities.Category;
import com.yosko.models.CategoryRequest;
import com.yosko.models.CustomResponse;

import java.util.List;

public interface CategoryService {
    List<Category> getCategories(String currentLang);

    Category getCategory(long id, String currentLang);

    CustomResponse createCategory(CategoryRequest categoryRequest, String currentLang);

    CustomResponse updateCategory(long id, CategoryRequest categoryRequest, String currentLang);

    CustomResponse deleteCategory(long id, String currentLang);

    void updateProvidedCategory(Category category, CategoryRequest categoryRequest, String currentLang);

    Category retrieveCategory(String categoryName, String currentLang);
}
