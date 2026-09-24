package com.upn.lovelychickenbackend.service.implementation;

import com.upn.lovelychickenbackend.model.Product;
import com.upn.lovelychickenbackend.repository.IGenericRepository;
import com.upn.lovelychickenbackend.repository.IProductRepository;
import com.upn.lovelychickenbackend.service.IProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService
        extends GenericService<Product, Integer>
        implements IProductService {

    private final IProductRepository repository;

    public ProductService(IProductRepository repository) {
        this.repository = repository;
    }

    @Override
    protected IGenericRepository<Product, Integer> getRepository() {
        return repository;
    }

    @Override
    public List<Product> findByCategory(String category) throws Exception {
        return repository.findByCategory(category);
    }

    @Override
    public List<Product> findByAvailability(Boolean available) throws Exception {
        return repository.findByAvailability(available);
    }
}