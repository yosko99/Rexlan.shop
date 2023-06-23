package com.yosko.services.implementation;

import com.yosko.dtos.dto.ProductDTO;
import com.yosko.dtos.mapper.ProductDTOMapper;
import com.yosko.entities.Category;
import com.yosko.entities.Product;
import com.yosko.entities.ProductTranslation;
import com.yosko.models.request.ProductUpdateRequest;
import com.yosko.repositories.ProductRepository;
import com.yosko.services.service.CategoryService;
import com.yosko.services.service.TranslationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceImplTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CategoryService categoryService;

    @Mock
    private TranslationService<Product> translationService;

    @Mock
    private ProductDTOMapper productDTOMapper;

    @InjectMocks
    private ProductServiceImpl productService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getProducts_ShouldReturnProductDTOList() {
        // Arrange
        int qty = 10;
        String currentLang = "en";

        List<Product> products = Arrays.asList(new Product(), new Product());
        Page<Product> productPage = new PageImpl<>(products);

        when(productRepository.findAll(any(Pageable.class))).thenReturn(productPage);

        TranslationService<Product> translationService = mock(TranslationService.class);
        ProductDTOMapper mapper = mock(ProductDTOMapper.class);
        when(translationService.translateMultipleObjects(products,
                currentLang)).thenReturn(new ArrayList<>());
        when(mapper.apply(any())).thenReturn(new ProductDTO());

        productService = new ProductServiceImpl(productRepository, categoryService,
                translationService);

        // Act
        List<ProductDTO> result = productService.getProducts(qty, currentLang);

        // Assert
        assertEquals(0, result.size());
        verify(productRepository, times(1)).findAll(any(Pageable.class));
        verify(translationService, times(1)).translateMultipleObjects(products,
                currentLang);
        verify(mapper, never()).apply(any());
    }

    @Test
    void getProductsByCategory_ShouldGetList() {
        // Arrange
        int qty = 1;
        String categoryName = "exampleCategory";
        String currentLang = "en";

        List<Product> mockProducts = new ArrayList<>();

        when(productRepository.getProductsByCategoryName(categoryName)).thenReturn(mockProducts);
        when(translationService.translateMultipleObjects(mockProducts, currentLang)).thenReturn(new ArrayList<>());

        // Act
        List<ProductDTO> result = productService.getProductsByCategory(qty, categoryName, currentLang);

        // Assert
        assertNotNull(result);
    }

    @Test
    void retrieveProduct_ShouldReturnProduct() {
        // Arrange
        long productID = 1;
        String currentLang = "en";

        Product product = new Product();
        when(productRepository.findById(productID)).thenReturn(Optional.of(product));

        // Act
        Product result = productService.retrieveProduct(productID, currentLang);

        // Assert
        assertEquals(product, result);
    }

    @Test
    void retrieveProduct_nonExistingId_shouldThrowException() {
        // Arrange
        long productID = 1;
        String currentLang = "en";

        when(productRepository.findById(productID)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResponseStatusException.class, () -> productService.retrieveProduct(productID, currentLang));
    }

    @Test
    void getProduct_existingId_shouldReturnProductDTO() {
        // Arrange
        long productID = 1;
        String currentLang = "en";

        Category category = new Category("test", "test", "test");
        Product product = new Product("test", 1, "test", "test", category);
        ProductDTO productDTO = new ProductDTO();
        when(productRepository.findById(productID)).thenReturn(Optional.of(product));
        when(translationService.translateSingleObject(product, currentLang)).thenReturn(product);
        when(productDTOMapper.apply(product)).thenReturn(productDTO);

        // Act
        ProductDTO result = productService.getProduct(productID, currentLang);

        // Assert
        assertNotNull(result);
    }

    @Test
    void testUpdateProvidedProduct_WithNonEnglish() {
        // Arrange
        String currentLang = "fr";
        Product currentProduct = new Product();
        ProductUpdateRequest updateRequest = new ProductUpdateRequest("newTitle", 10.0, "newDescription", "newCategory",
                "newImage");
        Category newCategory = new Category("newCategory", "bannerImg", "newCategory");

        when(categoryService.retrieveCategory("newCategory", currentLang)).thenReturn(newCategory);

        // Act
        Product updatedProduct = productService.updateProvidedProduct(currentProduct, updateRequest, currentLang);

        // Assert
        ProductTranslation translation = updatedProduct.getTranslations().get(0);
        assertEquals("newTitle", translation.getTitle());
        assertEquals("newDescription", translation.getDescription());
        assertEquals("fr", translation.getLang());
    }

    @Test
    void testUpdateProvidedProduct_WithEnglish() {
        // Arrange
        String currentLang = "en";
        Product currentProduct = new Product();
        ProductUpdateRequest updateRequest = new ProductUpdateRequest("newTitle", 10.0, "newDescription", "newCategory",
                "newImage");
        Category newCategory = new Category("newCategory", "bannerImg", "newCategory");

        when(categoryService.retrieveCategory("newCategory", currentLang)).thenReturn(newCategory);

        // Act
        Product updatedProduct = productService.updateProvidedProduct(currentProduct, updateRequest, currentLang);

        // Assert
        assertEquals("newTitle", updatedProduct.getTitle());
        assertEquals(0, updatedProduct.getTranslations().size());
    }
}
