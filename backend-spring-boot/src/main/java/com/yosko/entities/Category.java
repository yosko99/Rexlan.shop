package com.yosko.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String bannerImage;
    private String categoryURL;

    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            mappedBy = "category")
    @JsonIgnoreProperties("category")
    private List<CategoryTranslation> translations = new ArrayList<>();

    @OneToMany(
            mappedBy = "category",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    @JsonIgnoreProperties("category")
    private List<Product> products = new ArrayList<>();

    public Category(
            String name,
            String bannerImage,
            String categoryURL) {
        this.name = name;
        this.bannerImage = bannerImage;
        this.categoryURL = categoryURL;
    }

    public Category(
            String name,
            String bannerImage,
            String categoryURL,
            List<CategoryTranslation> translations) {
        this.name = name;
        this.bannerImage = bannerImage;
        this.categoryURL = categoryURL;
        this.translations = translations;
    }
}
