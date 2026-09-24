package com.upn.lovelychickenbackend.controller;

import com.upn.lovelychickenbackend.model.Payment;
import com.upn.lovelychickenbackend.service.IPaymentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final IPaymentService service;

    public PaymentController(IPaymentService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Payment>> findAll() throws Exception {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> findById(
            @PathVariable Integer id
    ) throws Exception {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Payment> save(
            @Valid @RequestBody Payment payment
    ) throws Exception {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.save(payment));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Payment> update(
            @PathVariable Integer id,
            @Valid @RequestBody Payment payment
    ) throws Exception {

        payment.setIdPayment(id);

        return ResponseEntity.ok(
                service.update(id, payment)
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