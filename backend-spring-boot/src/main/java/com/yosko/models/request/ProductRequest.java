package com.yosko.models.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductRequest {
    @NotNull
    private String title;
    @NotNull
    private Double price;
    @NotNull
    private String description;
    @NotNull
    private String categoryName;
    @NotNull
    private String image;
}
