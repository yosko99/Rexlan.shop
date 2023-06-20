package com.yosko.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    private double price;
    private String description;
    private String image;

    @Embedded
    private Rating rating = new Rating();

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "categoryID")
    private Category category;

    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            mappedBy = "product")
    @JsonIgnoreProperties("product")
    private List<ProductTranslation> translations = new ArrayList<>();

    public Product(
            String title,
            double price,
            String description,
            Category category,
            String image,
            Rating rating) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.category = category;
        this.image = image;
        this.rating = rating;
    }

    public Product(
            String title,
            double price,
            String description,
            Category category,
            String image,
            Rating rating,
            List<ProductTranslation> translations) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.category = category;
        this.image = image;
        this.rating = rating;
        this.translations = translations;
    }

    public Product(
            String title,
            double price,
            String description,
            String image,
            Category category) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.image = image;
        this.category = category;
    }
}