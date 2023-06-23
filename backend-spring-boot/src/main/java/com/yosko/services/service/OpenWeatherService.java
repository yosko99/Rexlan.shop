package com.yosko.services.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.yosko.models.response.OpenWeatherResponse;

public interface OpenWeatherService {
    OpenWeatherResponse getCurrentCity(String lon, String lat, String currentLang) throws JsonProcessingException;
}
