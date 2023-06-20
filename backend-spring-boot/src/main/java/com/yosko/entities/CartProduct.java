package com.yosko.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
public class CartProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String productID;
    private int productQuantity;

    public CartProduct(String productID, int productQuantity) {
        this.productID = productID;
        this.productQuantity = productQuantity;
    }
}