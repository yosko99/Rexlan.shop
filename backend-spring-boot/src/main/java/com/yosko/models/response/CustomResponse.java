package com.yosko.models.response;

import com.yosko.entities.Category;
import com.yosko.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class CustomResponse {
    private String msg;
    private List<Product> products = new ArrayList<>();
    private Product product;
    private Category category;

    public CustomResponse(String msg) {
        this.msg = msg;
    }

    public CustomResponse(String msg, Product product) {
        this.msg = msg;
        this.product = product;
    }

    public CustomResponse(String msg, Category category) {
        this.msg = msg;
        this.category = category;
    }
}
