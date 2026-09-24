package com.upn.lovelychickenbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idOrder;

    @NotNull(message = "La fecha del pedido es obligatoria")
    private LocalDateTime createdAt;

    @NotBlank(message = "El tipo de pedido es obligatorio")
    private String orderType;

    @NotBlank(message = "El estado del pedido es obligatorio")
    private String status;

    @NotNull(message = "El total es obligatorio")
    @PositiveOrZero(message = "El total no puede ser negativo")
    private BigDecimal total;

    @ManyToOne
    @JoinColumn(name = "id_table")
    private DiningTable diningTable;
}
