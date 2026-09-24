package com.upn.lovelychickenbackend.dto;

public record LoginRequest(
        String username,
        String password
) {
}