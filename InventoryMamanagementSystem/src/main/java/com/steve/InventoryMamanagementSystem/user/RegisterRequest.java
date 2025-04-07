package com.steve.InventoryMamanagementSystem.user;

import com.steve.InventoryMamanagementSystem.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterRequest {

    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Email is required")
    @Email(message = "provide a valid email")
    private String email;
    @NotBlank(message = "password is required")
    @Size(min = 4, message = "password must have at least 5 characters")
    private String password;
    @NotBlank(message = "phoneNumber is required")
    private  String phoneNumber;
    private UserRole userRole;
}
