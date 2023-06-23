package com.yosko.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.yosko.models.response.OpenWeatherResponse;
import com.yosko.services.service.OpenWeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/openweather")
public class OpenWeatherController {
    private final OpenWeatherService openWeatherService;

    @GetMapping("/city")
    public OpenWeatherResponse getCurrentCity(
            @RequestParam(value = "lon", defaultValue = "25.9") String lon,
            @RequestParam(value = "lat", defaultValue = "43.8") String lat,
            @RequestParam(value = "currentLang", defaultValue = "en", required = false) String currentLang) throws JsonProcessingException {
        return openWeatherService.getCurrentCity(lon, lat, currentLang);
    }
}
