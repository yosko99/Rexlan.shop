package com.yosko.services.implementation;

import com.yosko.entities.Category;
import com.yosko.services.service.TranslationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Qualifier("category")
@RequiredArgsConstructor
public class CategoryTranslationServiceImpl implements TranslationService<Category> {
    @Override
    public Category getSingleTranslation(Category object, String currentLang) {
        return null;
    }

    @Override
    public List<Category> getMultipleTranslations(List<Category> objects, String currentLang) {
        return null;
    }
}
