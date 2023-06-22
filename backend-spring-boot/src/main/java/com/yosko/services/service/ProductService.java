package com.yosko.services.service;

import com.yosko.dtos.dto.ProductDTO;
import com.yosko.models.CustomResponse;
import com.yosko.entities.Product;
import com.yosko.enums.ProductSortingType;
import com.yosko.models.ProductRequest;
import com.yosko.models.ProductUpdateRequest;

import java.util.List;

public interface ProductService {
    List<ProductDTO> getProducts(int qty, String currentLang);

    ProductDTO getProduct(long productID, String currentLang);

    List<ProductDTO> getProductsByCategory(int qty, String categoryName, String currentLang);

    List<ProductDTO> getProductsSortedByAttribute(int qty, ProductSortingType productAttribute, String currentLang);

    List<ProductDTO> getProductsByQueryString(String pattern, String currentLang);

    Product createProduct(ProductRequest productRequest, String currentLang);

    CustomResponse deleteProduct(long productID, String currentLang);

    CustomResponse updateProduct(long productID, ProductUpdateRequest productRequest, String currentLang);

    Product updateProvidedProduct(Product currentProduct, ProductUpdateRequest productRequest, String currentLang);

    Product retrieveProduct(long id, String currentLang);
}
