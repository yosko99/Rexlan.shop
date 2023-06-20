package com.yosko.services.implementation;

import com.yosko.entities.Category;
import com.yosko.entities.Product;
import com.yosko.repositories.ProductRepository;
import com.yosko.services.service.TranslationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Qualifier("product")
@RequiredArgsConstructor
public class ProductTranslationServiceImpl implements TranslationService<Product> {
    private final ProductRepository productRepository;
    private final TranslationService<Category> categoryTranslationService;

    @Override
    public Product getSingleTranslation(Product object, String currentLang) {
        return null;
    }

    @Override
    public List<Product> getMultipleTranslations(List<Product> objects, String currentLang) {
        return null;
    }
}
