package com.yosko.services.implementation;

import com.yosko.entities.Product;
import com.yosko.enums.ProductSortingType;
import com.yosko.models.CustomResponse;
import com.yosko.models.ProductRequest;
import com.yosko.repositories.ProductRepository;
import com.yosko.services.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

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
        return null;
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
}
