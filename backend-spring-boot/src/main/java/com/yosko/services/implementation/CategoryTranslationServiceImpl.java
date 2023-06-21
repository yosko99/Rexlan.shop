package com.yosko.services.implementation;

import com.yosko.entities.Category;
import com.yosko.entities.CategoryTranslation;
import com.yosko.services.service.TranslationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Qualifier("category")
@RequiredArgsConstructor
@Slf4j
public class CategoryTranslationServiceImpl implements TranslationService<Category> {
    @Override
    public Category translateSingleObject(Category category, String currentLang) {
        log.info("Translating category ({}) to ({}) lang", category.getName(), currentLang);
        category.setCategoryURL(category.getName());

        for (CategoryTranslation translation : category.getTranslations()) {
            if (translation.getLang().equals(currentLang)) {
                category.setName(translation.getName());
                break;
            }
        }

        return category;
    }

    @Override
    public List<Category> translateMultipleObjects(List<Category> categories, String currentLang) {
        return categories.stream()
                .map((category -> translateSingleObject(category, currentLang)))
                .toList();
    }
}
