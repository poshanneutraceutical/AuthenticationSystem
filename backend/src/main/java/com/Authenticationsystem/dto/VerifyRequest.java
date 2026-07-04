package com.Authenticationsystem.dto;


public class VerifyRequest {
    private String qrId;
    private String code;

    public String getQrId() { return qrId; }
    public void setQrId(String qrId) { this.qrId = qrId; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
}