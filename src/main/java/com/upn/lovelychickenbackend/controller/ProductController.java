package com.upn.lovelychickenbackend.controller;

import com.upn.lovelychickenbackend.model.Product;
import com.upn.lovelychickenbackend.service.IProductService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final IProductService service;

    public ProductController(IProductService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Product>> findAll()
            throws Exception {

        return ResponseEntity.ok(
                service.findAll()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(
            @PathVariable Integer id
    ) throws Exception {

        return ResponseEntity.ok(
                service.findById(id)
        );
    }

    @PostMapping
    public ResponseEntity<Product> save(
            @Valid @RequestBody Product product
    ) throws Exception {

        Product saved =
                service.save(product);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(
            @PathVariable Integer id,
            @Valid @RequestBody Product product
    ) throws Exception {

        product.setIdProduct(id);

        return ResponseEntity.ok(
                service.update(id, product)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Integer id
    ) throws Exception {

        service.delete(id);

        return ResponseEntity
                .noContent()
                .build();
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> findByCategory(
            @PathVariable String category
    ) throws Exception {

        return ResponseEntity.ok(
                service.findByCategory(category)
        );
    }

    @GetMapping("/availability/{available}")
    public ResponseEntity<List<Product>> findByAvailability(
            @PathVariable Boolean available
    ) throws Exception {

        return ResponseEntity.ok(
                service.findByAvailability(available)
        );
    }
}