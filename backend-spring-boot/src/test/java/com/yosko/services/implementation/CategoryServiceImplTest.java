package com.yosko.services.implementation;

import com.yosko.entities.Category;
import com.yosko.models.request.CategoryRequest;
import com.yosko.models.response.CustomResponse;
import com.yosko.repositories.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class CategoryServiceImplTest {
    @InjectMocks
    private CategoryServiceImpl categoryService;

    @Mock
    private CategoryRepository categoryRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void retrieveCategory_shouldReturnCategory() {
        // Arrange
        String categoryName = "TestCategory";
        Category category = new Category();
        category.setName(categoryName);

        when(categoryRepository.findByName(categoryName)).thenReturn(category);

        String currentLang = "en";

        // Act
        Category retrievedCategory = categoryService.retrieveCategory(categoryName, currentLang);

        // Assert
        assertEquals(category, retrievedCategory);
    }

    @Test
    void retrieveCategory_shouldThrowNotFoundException() {
        // Arrange
        String categoryName = "NonExistentCategory";

        when(categoryRepository.findByName(categoryName)).thenReturn(null);

        String currentLang = "en";

        // Act and Assert
        assertThrows(ResponseStatusException.class, () -> categoryService.retrieveCategory(categoryName, currentLang),
                "Category with name (NonExistentCategory) could not be found.");
    }

    @Test
    void createCategory_shouldSaveAndReturnCustomResponse() {
        // Arrange
        String categoryName = "TestCategory";
        String bannerImg = "test.jpg";
        String name = "TestCategory";
        CategoryRequest categoryRequest = new CategoryRequest(categoryName, bannerImg);

        Category newCategory = new Category(categoryName, bannerImg, name);
        when(categoryRepository.save(newCategory)).thenReturn(newCategory);

        // Act
        CustomResponse result = categoryService.createCategory(categoryRequest, "en");

        // Assert
        assertEquals("The category was created", result.getMsg());
        assertEquals(newCategory, result.getCategory());

        verify(categoryRepository).save(newCategory);
    }
}