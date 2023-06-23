package com.yosko.services.service;

import com.yosko.dtos.dto.ProductDTO;
import com.yosko.entities.Product;
import com.yosko.enums.ProductSortingType;
import com.yosko.models.response.CustomResponse;
import com.yosko.models.request.ProductRequest;
import com.yosko.models.request.ProductUpdateRequest;

import java.util.List;

public interface ProductService {
    List<ProductDTO> getProducts(int qty, String currentLang);

    ProductDTO getProduct(long productID, String currentLang);

    List<ProductDTO> getProductsByCategory(int qty, String categoryName, String currentLang);

    List<ProductDTO> getProductsSortedByAttribute(int qty, ProductSortingType productAttribute, String currentLang);

    List<ProductDTO> getProductsByQueryString(String pattern, String currentLang);

    Product createProduct(ProductRequest productRequest, String currentLang);

    CustomResponse deleteProduct(long productID, String currentLang);

    CustomResponse updateProduct(long productID, ProductUpdateRequest request, String currentLang);

    Product updateProvidedProduct(Product currentProduct, ProductUpdateRequest request, String currentLang);

    Product retrieveProduct(long id, String currentLang);
}
