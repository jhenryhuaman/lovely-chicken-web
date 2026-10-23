package com.upn.lovelychickenbackend.controller;

import com.upn.lovelychickenbackend.dto.LoginRequest;
import com.upn.lovelychickenbackend.dto.LoginResponse;
import com.upn.lovelychickenbackend.security.JwtService;

import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthController(
            AuthenticationManager authenticationManager,
            JwtService jwtService
    ) {
        this.authenticationManager =
                authenticationManager;

        this.jwtService =
                jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request
    ) {

        Authentication authenticationRequest =
                UsernamePasswordAuthenticationToken
                        .unauthenticated(
                                request.username(),
                                request.password()
                        );

        Authentication authenticationResponse =
                authenticationManager.authenticate(
                        authenticationRequest
                );

        UserDetails userDetails =
                (UserDetails)
                        authenticationResponse.getPrincipal();

        String token =
                jwtService.generateToken(
                        userDetails
                );

        return ResponseEntity.ok(
                new LoginResponse(token)
        );
    }
}