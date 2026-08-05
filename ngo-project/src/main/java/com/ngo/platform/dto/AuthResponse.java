package com.ngo.platform.dto;

public class AuthResponse {
    private String token;
    private String email;
    private String role;
    private String message;

    public AuthResponse(String token, String email, String role, String message) {
        this.token = token;
        this.email = email;
        this.role = role;
        this.message = message;
    }

    public String getToken() { return token; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public String getMessage() { return message; }

    public void setToken(String token) { this.token = token; }
    public void setEmail(String email) { this.email = email; }
    public void setRole(String role) { this.role = role; }
    public void setMessage(String message) { this.message = message; }
}
