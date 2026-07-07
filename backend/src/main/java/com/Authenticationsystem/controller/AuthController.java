package com.Authenticationsystem.controller;

import com.Authenticationsystem.service.AuthService;
import com.Authenticationsystem.dto.VerifyRequest;
import com.Authenticationsystem.dto.VerifyResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/verify")
    public ResponseEntity<VerifyResponse> verify(@RequestBody VerifyRequest request) {
        return ResponseEntity.ok(authService.checkCode(request));
    }
}