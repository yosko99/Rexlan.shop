package com.yosko.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private double initialPrice;
    private double priceToAddress;
    private String image;

    public Delivery(
            String title,
            double initialPrice,
            double priceToAddress,
            String image
    ) {
        this.title = title;
        this.initialPrice = initialPrice;
        this.priceToAddress = priceToAddress;
        this.image = image;
    }
}
