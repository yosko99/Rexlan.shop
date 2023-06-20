package com.yosko.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private String categoryURL;
    private double price;
    private String description;
    private String category;
    private String image;

    @Embedded
    private Rating rating;

    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            mappedBy = "product")
    private List<ProductTranslation> translations = new ArrayList<>();

    public Product(
            String title,
            String categoryURL,
            double price,
            String description,
            String category,
            String image,
            Rating rating
    ) {
        this.title = title;
        this.categoryURL = categoryURL;
        this.price = price;
        this.description = description;
        this.category = category;
        this.image = image;
        this.rating = rating;
    }

    public Product(
            String title,
            String categoryURL,
            double price,
            String description,
            String category,
            String image,
            Rating rating,
            List<ProductTranslation> translations
    ) {
        this.title = title;
        this.categoryURL = categoryURL;
        this.price = price;
        this.description = description;
        this.category = category;
        this.image = image;
        this.rating = rating;
        this.translations = translations;
    }
}