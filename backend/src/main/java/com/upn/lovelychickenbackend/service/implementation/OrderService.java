package com.upn.lovelychickenbackend.service.implementation;

import com.upn.lovelychickenbackend.model.Order;
import com.upn.lovelychickenbackend.repository.IGenericRepository;
import com.upn.lovelychickenbackend.repository.IOrderRepository;
import com.upn.lovelychickenbackend.service.IOrderService;
import org.springframework.stereotype.Service;

@Service
public class OrderService
        extends GenericService<Order, Integer>
        implements IOrderService {

    private final IOrderRepository repository;

    public OrderService(IOrderRepository repository) {
        this.repository = repository;
    }

    @Override
    protected IGenericRepository<Order, Integer> getRepository() {
        return repository;
    }
}