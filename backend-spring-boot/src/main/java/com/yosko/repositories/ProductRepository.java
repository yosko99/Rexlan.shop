package com.yosko.repositories;

import com.yosko.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "SELECT p FROM Product p " +
            "WHERE p.title LIKE %:pattern% OR EXISTS " +
            "(SELECT t FROM p.translations t " +
            "WHERE t.product = p AND t.title LIKE %:pattern%)")
    List<Product> searchProducts(@Param("pattern") String pattern);
}
