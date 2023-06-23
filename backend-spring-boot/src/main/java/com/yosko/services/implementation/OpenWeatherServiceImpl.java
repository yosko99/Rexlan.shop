package com.yosko.services.implementation;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yosko.exceptions.ExceptionHandler;
import com.yosko.models.response.OpenWeatherResponse;
import com.yosko.services.service.ApiService;
import com.yosko.services.service.OpenWeatherService;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

@Service
@RequiredArgsConstructor
@Slf4j
public class OpenWeatherServiceImpl implements OpenWeatherService {
    private final ApiService apiService;

    @Override
    public OpenWeatherResponse getCurrentCity(String lon, String lat, String currentLang) throws JsonProcessingException {
        Dotenv dotenv = Dotenv.load();
        String API_KEY = dotenv.get("OPENWEATHER_API_KEY");

        if (API_KEY == null) {
            throw ExceptionHandler.throwBadRequestStatusException("global.apiKeyNotProvided", currentLang);
        }

        try {
            String OPEN_WEATHER_URL = String.format("http://api.openweathermap.org/geo/1.0/reverse?lat=%s&lon=%s&appid=%s", lat, lon, API_KEY);

            String response = apiService.getApiResponse(OPEN_WEATHER_URL);

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response);
            String cityName = jsonNode.get(0).get("name").asText();

            return new OpenWeatherResponse(cityName);
        } catch (HttpClientErrorException e) {
            throw ExceptionHandler.throwBadRequestStatusException("controllers.openWeather.invalidCoordinates", currentLang);
        }
    }
}
