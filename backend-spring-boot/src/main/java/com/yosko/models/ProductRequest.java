package com.yosko.models;

public record ProductRequest(
        String title,
        double price,
        String description,
        String category,
        String image) {
}
