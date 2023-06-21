package com.yosko.services.implementation;

import com.yosko.entities.Category;
import com.yosko.entities.Product;
import com.yosko.entities.ProductTranslation;
import com.yosko.services.service.TranslationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Qualifier("product")
@RequiredArgsConstructor
@Slf4j
public class ProductTranslationServiceImpl implements TranslationService<Product> {
    private final TranslationService<Category> categoryTranslationService;

    @Override
    public Product translateSingleObject(Product product, String currentLang) {
        log.info("Translating product ({}) to ({}) lang", product.getTitle(),currentLang);

        for (ProductTranslation translation : product.getTranslations()) {
            if (translation.getLang().equals(currentLang)) {
                product.setTitle(translation.getTitle());
                product.setDescription(translation.getDescription());

                Category translatedCategory = categoryTranslationService.translateSingleObject(product.getCategory(), currentLang);
                product.setCategory(translatedCategory);
                break;
            }
        }
        return product;
    }

    @Override
    public List<Product> translateMultipleObjects(List<Product> products, String currentLang) {
        return products.stream()
                .map((product -> translateSingleObject(product, currentLang)))
                .toList();
    }
}
