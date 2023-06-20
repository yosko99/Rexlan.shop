package com.yosko.entities;

import com.yosko.utils.Time;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "\"user\"")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String email;
    private String password;
    private String name;
    private String address;
    private String phone;
    private String cartID;
    private String zipcode;
    private boolean isAdmin = false;
    private String createdAt;
    private String updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = Time.getCurrentTime();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Time.getCurrentTime();
    }

    public User(
            String email,
            String password,
            String name,
            String address,
            String phone,
            String cartID,
            String zipcode,
            boolean isAdmin
    ) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.cartID = cartID;
        this.zipcode = zipcode;
        this.isAdmin = isAdmin;
    }
}
