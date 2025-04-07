package com.steve.InventoryMamanagementSystem.exceptions;

public class InvalidCredentialHandler extends RuntimeException {
    public InvalidCredentialHandler(String message) {
        super(message);
    }
}
