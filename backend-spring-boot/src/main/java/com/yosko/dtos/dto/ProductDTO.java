package com.yosko.dtos.dto;

import com.yosko.entities.Rating;

public record ProductDTO(
        long id,
        String title,
        double price,
        String description,
        String image,
        Rating rating) {
}
