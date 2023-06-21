package com.yosko.models;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class ProductUpdateRequest {
    @NotNull
    private String title;
    @NotNull
    private Double price;
    @NotNull
    private String description;
    @NotNull
    private String category;
    @NotNull
    private String image;
}