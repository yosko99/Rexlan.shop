package com.yosko.services.implementation;

import com.yosko.entities.Category;
import com.yosko.entities.Product;
import com.yosko.enums.ProductSortingType;
import com.yosko.models.CustomResponse;
import com.yosko.models.ProductRequest;
import com.yosko.repositories.CategoryRepository;
import com.yosko.repositories.ProductRepository;
import com.yosko.services.service.ProductService;
import com.yosko.services.service.TranslationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final TranslationService<Product> translationService;

    @Override
    public List<Product> getProducts(int qty, String currentLang) {
        return null;
    }

    @Override
    public Product getProduct(long productID, String currentLang) {
        return null;
    }

    @Override
    public Product getProdctByCategory(int qty, String categoryName, String currentLang) {
        return null;
    }

    @Override
    public List<Product> getProductsSortedByAttribute(int qty, ProductSortingType productAttribute, String currentLang) {
        return null;
    }

    @Override
    public List<Product> getProductsByQueryString(String pattern, String currentLang) {
        return null;
    }

    @Override
    public Product createProduct(ProductRequest productRequest, String currentLang) {
        log.info("Saving product...");
        Category category = categoryRepository.findByName(productRequest.categoryName());

        Product newProduct = new Product(
                productRequest.title(),
                productRequest.price(),
                productRequest.description(),
                productRequest.image(),
                category);

        productRepository.save(newProduct);
        log.info("Product saved.");

        return newProduct;
    }

    @Override
    public CustomResponse deleteProduct(long productID, String currentLang) {
        return null;
    }

    @Override
    public CustomResponse updateProduct(ProductRequest productRequest, String currentLang) {
        return null;
    }

    @Override
    public void updateProvidedProduct(ProductRequest productRequest, String currentLang) {

    }

    @Override
    public CustomResponse createProvidedProduct(ProductRequest productRequest, String currentLang) {
        return null;
    }

    @Override
    public Product retrieveProduct(long id, String currentLang) {
        log.info("Retrieving product...");

        return productRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND,
                                "Can't find product with provided id"));
    }
}
