package com.Authenticationsystem.dto;

public class VerifyResponse {
    private String status; // "valid", "invalid", "already_verified"
    private String message;

    public VerifyResponse(String status, String message) {
        this.status = status;
        this.message = message;
    }

    public String getStatus() { return status; }
    public String getMessage() { return message; }
}