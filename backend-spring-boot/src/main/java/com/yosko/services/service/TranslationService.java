package com.yosko.services.service;

import java.util.List;

public interface TranslationService<T> {
    T translateSingleObject(T object, String currentLang);
    List<T> translateMultipleObjects(List<T> objects, String currentLang);
}
