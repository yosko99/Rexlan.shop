package com.yosko.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private boolean isLinked;
    private double totalPrice;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<CartProduct> products;

    @OneToOne
    @JoinColumn(name = "userID", referencedColumnName = "id")
    private User user;

    public Cart(boolean isLinked, double totalPrice, List<CartProduct> products, User user) {
        this.isLinked = isLinked;
        this.totalPrice = totalPrice;
        this.products = products;
        this.user = user;
    }
}
