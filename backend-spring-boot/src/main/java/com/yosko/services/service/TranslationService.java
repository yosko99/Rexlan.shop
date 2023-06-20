package com.yosko.services.service;

import java.util.List;

public interface TranslationService<T> {
    T getSingleTranslation(T object, String currentLang);
    List<T> getMultipleTranslations(List<T> objects, String currentLang);
}
