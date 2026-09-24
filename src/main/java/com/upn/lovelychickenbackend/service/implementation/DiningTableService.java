package com.upn.lovelychickenbackend.service.implementation;

import com.upn.lovelychickenbackend.model.DiningTable;
import com.upn.lovelychickenbackend.repository.IDiningTableRepository;
import com.upn.lovelychickenbackend.repository.IGenericRepository;
import com.upn.lovelychickenbackend.service.IDiningTableService;
import org.springframework.stereotype.Service;

@Service
public class DiningTableService
        extends GenericService<DiningTable, Integer>
        implements IDiningTableService {

    private final IDiningTableRepository repository;

    public DiningTableService(IDiningTableRepository repository) {
        this.repository = repository;
    }

    @Override
    protected IGenericRepository<DiningTable, Integer> getRepository() {
        return repository;
    }
}