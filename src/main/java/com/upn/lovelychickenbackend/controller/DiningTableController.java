package com.upn.lovelychickenbackend.controller;

import com.upn.lovelychickenbackend.model.DiningTable;
import com.upn.lovelychickenbackend.service.IDiningTableService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dining-tables")
public class DiningTableController {

    private final IDiningTableService service;

    public DiningTableController(IDiningTableService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<DiningTable>> findAll() throws Exception {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DiningTable> findById(
            @PathVariable Integer id
    ) throws Exception {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<DiningTable> save(
            @Valid @RequestBody DiningTable diningTable
    ) throws Exception {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.save(diningTable));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DiningTable> update(
            @PathVariable Integer id,
            @Valid @RequestBody DiningTable diningTable
    ) throws Exception {

        diningTable.setIdTable(id);

        return ResponseEntity.ok(
                service.update(id, diningTable)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Integer id
    ) throws Exception {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}