package com.upn.lovelychickenbackend.controller;

import com.upn.lovelychickenbackend.model.OrderDetail;
import com.upn.lovelychickenbackend.service.IOrderDetailService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-details")
public class OrderDetailController {

    private final IOrderDetailService service;

    public OrderDetailController(IOrderDetailService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<OrderDetail>> findAll() throws Exception {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDetail> findById(
            @PathVariable Integer id
    ) throws Exception {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<OrderDetail> save(
            @Valid @RequestBody OrderDetail orderDetail
    ) throws Exception {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.save(orderDetail));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDetail> update(
            @PathVariable Integer id,
            @Valid @RequestBody OrderDetail orderDetail
    ) throws Exception {

        orderDetail.setIdOrderDetail(id);

        return ResponseEntity.ok(
                service.update(id, orderDetail)
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