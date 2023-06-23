package com.yosko.dtos.mapper;

import com.yosko.dtos.dto.ProductDTO;
import com.yosko.entities.Product;
import com.yosko.services.service.TranslationService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@RequiredArgsConstructor
@AllArgsConstructor
public class ProductDTOMapper implements Function<Product, ProductDTO> {
    private TranslationService<Product> translationService;
    private String currentLang;

    @Override
    public ProductDTO apply(Product product) {
        Product translatedProduct = translationService.translateSingleObject(product, currentLang);

        return new ProductDTO(
                translatedProduct.getId(),
                translatedProduct.getTitle(),
                translatedProduct.getPrice(),
                translatedProduct.getDescription(),
                translatedProduct.getImage(),
                translatedProduct.getRating(),
                translatedProduct.getCategory().getCategoryURL(),
                translatedProduct.getCategory().getName());
    }
}
