package com.upn.lovelychickenbackend.service.implementation;

import com.upn.lovelychickenbackend.model.Payment;
import com.upn.lovelychickenbackend.repository.IGenericRepository;
import com.upn.lovelychickenbackend.repository.IPaymentRepository;
import com.upn.lovelychickenbackend.service.IPaymentService;
import org.springframework.stereotype.Service;

@Service
public class PaymentService
        extends GenericService<Payment, Integer>
        implements IPaymentService {

    private final IPaymentRepository repository;

    public PaymentService(IPaymentRepository repository) {
        this.repository = repository;
    }

    @Override
    protected IGenericRepository<Payment, Integer> getRepository() {
        return repository;
    }
}