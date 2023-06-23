package com.yosko.services.implementation;


import com.yosko.services.service.ApiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApiServiceImpl implements ApiService {
    private final RestTemplate restTemplate;

    @Override
    public String getApiResponse(String url) {
        return restTemplate.getForObject(url, String.class);
    }
}
