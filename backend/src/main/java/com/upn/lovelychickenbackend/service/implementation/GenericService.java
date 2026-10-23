package com.upn.lovelychickenbackend.service.implementation;

import com.upn.lovelychickenbackend.exception.ResourceNotFoundException;
import com.upn.lovelychickenbackend.repository.IGenericRepository;
import com.upn.lovelychickenbackend.service.IGenericService;

import java.util.List;

public abstract class GenericService<T, ID>
        implements IGenericService<T, ID> {

    protected abstract IGenericRepository<T, ID> getRepository();

    @Override
    public T save(T t) throws Exception {
        return getRepository().save(t);
    }

    @Override
    public T update(ID id, T t) throws Exception {

        if (!getRepository().existsById(id)) {
            throw new ResourceNotFoundException(
                    "No existe un recurso con el ID: " + id
            );
        }

        return getRepository().save(t);
    }

    @Override
    public List<T> findAll() throws Exception {
        return getRepository().findAll();
    }

    @Override
    public T findById(ID id) throws Exception {

        return getRepository()
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "No existe un recurso con el ID: " + id
                        )
                );
    }

    @Override
    public void delete(ID id) throws Exception {

        if (!getRepository().existsById(id)) {
            throw new ResourceNotFoundException(
                    "No existe un recurso con el ID: " + id
            );
        }

        getRepository().deleteById(id);
    }
}