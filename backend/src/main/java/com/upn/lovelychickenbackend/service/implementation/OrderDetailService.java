package com.upn.lovelychickenbackend.service.implementation;

import com.upn.lovelychickenbackend.model.OrderDetail;
import com.upn.lovelychickenbackend.repository.IGenericRepository;
import com.upn.lovelychickenbackend.repository.IOrderDetailRepository;
import com.upn.lovelychickenbackend.service.IOrderDetailService;
import org.springframework.stereotype.Service;

@Service
public class OrderDetailService
        extends GenericService<OrderDetail, Integer>
        implements IOrderDetailService {

    private final IOrderDetailRepository repository;

    public OrderDetailService(IOrderDetailRepository repository) {
        this.repository = repository;
    }

    @Override
    protected IGenericRepository<OrderDetail, Integer> getRepository() {
        return repository;
    }
}