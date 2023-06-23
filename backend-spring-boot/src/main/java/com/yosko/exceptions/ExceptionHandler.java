package com.yosko.exceptions;

import com.yosko.utils.MultilingualFieldType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Locale;

@Slf4j
public class ExceptionHandler {
    public static ResponseStatusException throwNotFoundStatusException(String resourceKey, String currentLang) {
        log.warn("Data not found!");

        return new ResponseStatusException(HttpStatus.NOT_FOUND,
                new MultilingualFieldType(Locale.forLanguageTag(currentLang))
                        .getLocalizedString(resourceKey));
    }

    public static ResponseStatusException throwBadRequestStatusException(String resourceKey, String currentLang) {
        log.warn("Bad request!");

        return new ResponseStatusException(HttpStatus.BAD_REQUEST,
                new MultilingualFieldType(Locale.forLanguageTag(currentLang))
                        .getLocalizedString(resourceKey));
    }
}
