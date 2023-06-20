package com.yosko.services.service;

import com.yosko.models.CustomResponse;
import com.yosko.entities.Product;
import com.yosko.enums.ProductSortingType;
import com.yosko.models.ProductRequest;

import java.util.List;

public interface ProductService {
    List<Product> getProducts(int qty, String currentLang);

    Product getProduct(long productID, String currentLang);

    Product getProdctByCategory(int qty, String categoryName, String currentLang);

    List<Product> getProductsSortedByAttribute(int qty, ProductSortingType productAttribute, String currentLang);

    List<Product> getProductsByQueryString(String pattern, String currentLang);

    Product createProduct(ProductRequest productRequest, String currentLang);

    CustomResponse deleteProduct(long productID, String currentLang);

    CustomResponse updateProduct(ProductRequest productRequest, String currentLang);

    void updateProvidedProduct(ProductRequest productRequest, String currentLang);

    CustomResponse createProvidedProduct(ProductRequest productRequest, String currentLang);
}
