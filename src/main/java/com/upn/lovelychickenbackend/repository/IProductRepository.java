package com.upn.lovelychickenbackend.repository;

import com.upn.lovelychickenbackend.model.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductRepository
        extends IGenericRepository<Product, Integer> {

    List<Product> findByCategory(
            @Param("category") String category
    );

    @Query("SELECT p FROM Product p WHERE p.available = :available")
    List<Product> findByAvailability(
            @Param("available") Boolean available
    );
}