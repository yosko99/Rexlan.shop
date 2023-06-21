package com.yosko.services.implementation;


import com.yosko.entities.Category;
import com.yosko.entities.CategoryTranslation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CategoryTranslationServiceImplTest {
    private CategoryTranslationServiceImpl translationService;

    @BeforeEach
    void setUp() {
        translationService = new CategoryTranslationServiceImpl();
    }

    @Test
    void translateSingleObject_shouldTranslateCategory() {
        // Arrange
        Category category = new Category();
        category.setName("Category");
        category.setCategoryURL(null);

        CategoryTranslation translation = new CategoryTranslation();
        translation.setLang("fr");
        translation.setName("Catégorie");

        List<CategoryTranslation> translations = new ArrayList<>();
        translations.add(translation);

        category.setTranslations(translations);

        String currentLang = "fr";

        // Act
        Category translatedCategory = translationService.translateSingleObject(category, currentLang);

        // Assert
        assertEquals("Catégorie", translatedCategory.getName());
        assertEquals("Category", translatedCategory.getCategoryURL());
    }

    @Test
    void translateMultipleObjects_shouldTranslateCategories() {
        // Arrange
        Category category1 = new Category();
        category1.setName("Category1");
        category1.setCategoryURL(null);

        Category category2 = new Category();
        category2.setName("Category2");
        category2.setCategoryURL(null);

        CategoryTranslation translation1 = new CategoryTranslation();
        translation1.setLang("fr");
        translation1.setName("Catégorie1");

        CategoryTranslation translation2 = new CategoryTranslation();
        translation2.setLang("fr");
        translation2.setName("Catégorie2");

        List<CategoryTranslation> translations1 = new ArrayList<>();
        translations1.add(translation1);

        List<CategoryTranslation> translations2 = new ArrayList<>();
        translations2.add(translation2);

        category1.setTranslations(translations1);
        category2.setTranslations(translations2);

        List<Category> categories = new ArrayList<>();
        categories.add(category1);
        categories.add(category2);

        String currentLang = "fr";

        // Act
        List<Category> translatedCategories = translationService.translateMultipleObjects(categories, currentLang);

        // Assert
        assertEquals(2, translatedCategories.size());

        Category translatedCategory1 = translatedCategories.get(0);
        assertEquals("Catégorie1", translatedCategory1.getName());
        assertEquals("Category1", translatedCategory1.getCategoryURL());

        Category translatedCategory2 = translatedCategories.get(1);
        assertEquals("Catégorie2", translatedCategory2.getName());
        assertEquals("Category2", translatedCategory2.getCategoryURL());
    }
}
