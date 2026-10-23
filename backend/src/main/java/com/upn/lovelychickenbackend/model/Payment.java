package com.upn.lovelychickenbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPayment;

    @NotNull(message = "El monto es obligatorio")
    @Positive(message = "El monto debe ser mayor a 0")
    private BigDecimal amount;

    @NotBlank(message = "El método de pago es obligatorio")
    private String paymentMethod;

    @NotBlank(message = "El estado del pago es obligatorio")
    private String status;

    @NotNull(message = "La fecha de pago es obligatoria")
    private LocalDateTime paidAt;

    @NotNull(message = "El pedido es obligatorio")
    @OneToOne
    @JoinColumn(name = "id_order")
    private Order order;
}