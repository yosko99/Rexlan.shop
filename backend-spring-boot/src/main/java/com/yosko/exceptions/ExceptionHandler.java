package com.yosko.exceptions;

import com.yosko.utils.MultilingualFieldType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Locale;

@Slf4j
public class ExceptionHandler {
    public static void throwNotFoundStatusException(String resourceKey, String currentLang) {
        log.error("Data not found!");

        throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                new MultilingualFieldType(Locale.forLanguageTag(currentLang))
                        .getLocalizedString(resourceKey));
    }
}
