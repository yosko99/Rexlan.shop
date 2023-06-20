package com.yosko.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class CategoryTranslation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String lang;

    @ManyToOne
    private Category category;

    public CategoryTranslation(
            String name,
            String lang,
            Category category
    ) {
        this.name = name;
        this.lang = lang;
        this.category = category;
    }
}
