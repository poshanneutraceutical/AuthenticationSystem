package com.Authenticationsystem.service;

import com.Authenticationsystem.model.ProductAuth;
import com.Authenticationsystem.dto.VerifyRequest;
import com.Authenticationsystem.dto.VerifyResponse;
import com.Authenticationsystem.repository.ProductAuthRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final ProductAuthRepository repository;

    public AuthService(ProductAuthRepository repository) {
        this.repository = repository;
    }

    public VerifyResponse checkCode(VerifyRequest request) {
        // 1. Find the row in the database using the QR ID
        ProductAuth product = repository.findById(request.getQrId()).orElse(null);

        // If the QR ID doesn't exist in DB at all
        if (product == null) {
            return new VerifyResponse("invalid", "Invalid QR Code or Code.");
        }

        // POINT 3: Check if it is ALREADY VERIFIED
        if (product.isVerified()) {
            return new VerifyResponse("already_verified", "This product has already been verified previously. If you are not the original purchaser or believe this verification is unexpected.");
        }

        // POINT 2 & 1: Match the 9-digit code (ignoring uppercase/lowercase)
        if (product.getSecretCode().equalsIgnoreCase(request.getCode())) {
            // POINT 1: VALID CODE - Mark as verified so it can't be used again
            product.setVerified(true);
            repository.save(product);
            return new VerifyResponse("valid", "Success!Congratulations! Your product is  100% genuine and has been successfully verified. Thank you for choosing US.");
        } else {
            // POINT 2: INVALID CODE
            return new VerifyResponse("invalid", "Sorry, The verification code you entered is invalid or does not exist in our records. Please check the code and try again.");
        }
    }
}