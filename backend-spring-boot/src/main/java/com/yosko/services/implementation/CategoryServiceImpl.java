package com.yosko.services.implementation;

import com.yosko.entities.Category;
import com.yosko.models.CategoryRequest;
import com.yosko.models.CustomResponse;
import com.yosko.repositories.CategoryRepository;
import com.yosko.services.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> getCategories(String currentLang) {
        return null;
    }

    @Override
    public Category getCategory(String categoryName, String currentLang) {
        return null;
    }

    @Override
    public CustomResponse createCategory(CategoryRequest categoryRequest, String currentLang) {
        log.info("Saving category...");

        Category newCategory = new Category(
                categoryRequest.name(),
                categoryRequest.bannerImg(),
                categoryRequest.name()
        );

        categoryRepository.save(newCategory);
        log.info("Category saved.");

        return new CustomResponse("Category created", newCategory);
    }

    @Override
    public CustomResponse updateCategory(CategoryRequest categoryRequest, String currentLang) {
        return null;
    }

    @Override
    public CustomResponse deleteCategory(String categoryName, String currentLang) {
        return null;
    }

    @Override
    public Category createProvidedCategory(CategoryRequest categoryRequest, String currentLang) {
        return null;
    }

    @Override
    public void updateProvidedCategory(CategoryRequest categoryRequest, String currentLang) {

    }

    @Override
    public void deleteEmptyCategory(String categoryName) {

    }

    @Override
    public Category retrieveCategory(String categoryName, String currentLang) {
        log.info("Retrieving category...");

        Category category = categoryRepository.findByName(categoryName);

        if (category == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Can't find category with provided id");
        }

        return category;
    }
}
