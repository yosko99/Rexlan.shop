package com.yosko.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class ProductTranslation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private String description;
    private String lang;

    @ManyToOne
    @JsonBackReference
    private Product product;

    public ProductTranslation(
            String title,
            String description,
            String lang,
            Product product
    ) {
        this.title = title;
        this.description = description;
        this.lang = lang;
        this.product = product;
    }
}