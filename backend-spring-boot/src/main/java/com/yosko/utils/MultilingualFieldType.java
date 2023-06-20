package com.yosko.utils;

import java.util.Locale;
import java.util.ResourceBundle;

public class MultilingualFieldType {
    private final ResourceBundle bundle;

    public MultilingualFieldType(Locale locale) {
        bundle = ResourceBundle.getBundle("MultilingualFieldType", locale);
    }

    public String getLocalizedString(String key) {
        return bundle.getString(key);
    }
}
