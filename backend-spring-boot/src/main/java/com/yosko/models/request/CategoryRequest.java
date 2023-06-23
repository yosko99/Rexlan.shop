package com.yosko.models.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryRequest {
    @NotNull
    private String name;
    @NotNull
    private String bannerImg;
}
