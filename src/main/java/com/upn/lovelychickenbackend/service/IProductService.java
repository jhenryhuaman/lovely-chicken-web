package com.upn.lovelychickenbackend.service;

import com.upn.lovelychickenbackend.model.Product;

import java.util.List;

public interface IProductService
        extends IGenericService<Product, Integer> {

    List<Product> findByCategory(String category) throws Exception;

    List<Product> findByAvailability(Boolean available) throws Exception;
}