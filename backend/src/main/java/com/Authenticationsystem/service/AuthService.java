package com.Authenticationsystem.service;

import com.Authenticationsystem.dto.VerifyRequest;
import com.Authenticationsystem.dto.VerifyResponse;
import com.Authenticationsystem.model.ProductAuth;
import com.Authenticationsystem.repository.ProductAuthRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final ProductAuthRepository repository;

    public AuthService(ProductAuthRepository repository) {
        this.repository = repository;
    }

    public VerifyResponse checkCode(VerifyRequest request) {
        ProductAuth product = repository.findBySecretCode(request.getCode()).orElse(null);

        if (product == null) {
            return new VerifyResponse("invalid", "Sorry, the code you entered is invalid.");
        }

        return new VerifyResponse("valid", "Success! Your product is 100% genuine.");
    }
}