package com.yosko.entities;

import com.yosko.utils.Time;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "\"order\"")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userID", referencedColumnName = "id")
    private User user;

    @OneToOne
    @JoinColumn(name = "cartID", referencedColumnName = "id")
    private Cart cart;

    private String orderStatus;
    private String selectedCourier;
    private String name;
    private String address;
    private String city;
    private Integer zipcode;
    private String phone;
    private Double productsPrice;
    private Double deliveryPrice;
    private String createdAt;
    private String updatedAt;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<CartProduct> products = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = Time.getCurrentTime();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Time.getCurrentTime();
    }

    public Order(
            User user,
            Cart cart,
            String orderStatus,
            String selectedCourier,
            String name,
            String address,
            String city,
            Integer zipcode,
            String phone,
            Double productsPrice,
            Double deliveryPrice,
            List<CartProduct> products
    ) {
        this.user = user;
        this.cart = cart;
        this.orderStatus = orderStatus;
        this.selectedCourier = selectedCourier;
        this.name = name;
        this.address = address;
        this.city = city;
        this.zipcode = zipcode;
        this.phone = phone;
        this.productsPrice = productsPrice;
        this.deliveryPrice = deliveryPrice;
        this.products = products;
    }
}
