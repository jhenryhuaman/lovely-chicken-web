package com.upn.lovelychickenbackend.controller;

import com.upn.lovelychickenbackend.model.Order;
import com.upn.lovelychickenbackend.service.IOrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final IOrderService service;

    public OrderController(IOrderService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Order>> findAll() throws Exception {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> findById(
            @PathVariable Integer id
    ) throws Exception {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Order> save(
            @Valid @RequestBody Order order
    ) throws Exception {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.save(order));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> update(
            @PathVariable Integer id,
            @Valid @RequestBody Order order
    ) throws Exception {

        order.setIdOrder(id);

        return ResponseEntity.ok(
                service.update(id, order)
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