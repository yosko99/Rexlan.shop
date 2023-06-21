package com.yosko.dtos.dto;

import com.yosko.entities.Rating;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private long id;
    private String title;
    private double price;
    private String description;
    private String image;
    private Rating rating;
}
