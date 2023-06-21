package com.yosko.services.implementation;

import com.yosko.entities.Category;
import com.yosko.entities.Product;
import com.yosko.entities.ProductTranslation;
import com.yosko.services.service.TranslationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ProductTranslationServiceImplTest {
    @InjectMocks
    private ProductTranslationServiceImpl translationService;

    @Mock
    private TranslationService<Category> categoryTranslationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void translateSingleObject_shouldTranslateProduct() {
        // Arrange
        Product product = new Product();
        product.setTitle("Product");
        product.setDescription("Product description");
        product.setCategory(new Category());

        ProductTranslation translation = new ProductTranslation();
        translation.setLang("fr");
        translation.setTitle("Produit");
        translation.setDescription("Description du produit");

        List<ProductTranslation> translations = new ArrayList<>();
        translations.add(translation);

        product.setTranslations(translations);

        Category translatedCategory = new Category();
        when(categoryTranslationService.translateSingleObject(any(Category.class), eq("fr"))).thenReturn(translatedCategory);

        String currentLang = "fr";

        // Act
        Product translatedProduct = translationService.translateSingleObject(product, currentLang);

        // Assert
        assertEquals("Produit", translatedProduct.getTitle());
        assertEquals("Description du produit", translatedProduct.getDescription());
        assertEquals(translatedCategory, translatedProduct.getCategory());

        verify(categoryTranslationService, times(1)).translateSingleObject(any(Category.class), eq("fr"));
    }

    @Test
    void translateMultipleObjects_shouldTranslateProducts() {
        // Arrange
        Product product1 = new Product();
        product1.setTitle("Product1");
        product1.setDescription("Product description 1");
        product1.setCategory(new Category());

        Product product2 = new Product();
        product2.setTitle("Product2");
        product2.setDescription("Product description 2");
        product2.setCategory(new Category());

        ProductTranslation translation1 = new ProductTranslation();
        translation1.setLang("fr");
        translation1.setTitle("Produit1");
        translation1.setDescription("Description du produit 1");

        ProductTranslation translation2 = new ProductTranslation();
        translation2.setLang("fr");
        translation2.setTitle("Produit2");
        translation2.setDescription("Description du produit 2");

        List<ProductTranslation> translations1 = new ArrayList<>();
        translations1.add(translation1);

        List<ProductTranslation> translations2 = new ArrayList<>();
        translations2.add(translation2);

        product1.setTranslations(translations1);
        product2.setTranslations(translations2);

        Category translatedCategory = new Category();
        when(categoryTranslationService.translateSingleObject(any(Category.class), eq("fr"))).thenReturn(translatedCategory);

        List<Product> products = new ArrayList<>();
        products.add(product1);
        products.add(product2);

        String currentLang = "fr";

        // Act
        List<Product> translatedProducts = translationService.translateMultipleObjects(products, currentLang);

        // Assert
        assertEquals(2, translatedProducts.size());

        Product translatedProduct1 = translatedProducts.get(0);
        assertEquals("Produit1", translatedProduct1.getTitle());
        assertEquals("Description du produit 1", translatedProduct1.getDescription());
        assertEquals(translatedCategory, translatedProduct1.getCategory());

        Product translatedProduct2 = translatedProducts.get(1);
        assertEquals("Produit2", translatedProduct2.getTitle());
        assertEquals("Description du produit 2", translatedProduct2.getDescription());
        assertEquals(translatedCategory, translatedProduct2.getCategory());

        verify(categoryTranslationService, times(2)).translateSingleObject(any(Category.class), eq("fr"));
    }
}
