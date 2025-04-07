package com.steve.InventoryMamanagementSystem.user;


import com.steve.InventoryMamanagementSystem.Transaction.Transaction;
import com.steve.InventoryMamanagementSystem.enums.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "name is required")
    @Size(min = 3, message = "name must have a least 3 characters")
    private String name;

    @NotBlank(message = "email is required")
    @Email(message = "provide a valid email ")
    @Column(unique = true)
    private String email;


    @NotBlank(message = "Password is required")
    @Size(min = 3, message = "Password must have a least 3 characters")
    private String password;

    @NotBlank(message = "Phone number is required")
    @Size(min = 5, message = "name must have a least 3 characters")
    @Positive(message = "Telephone number can not be negative")
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @OneToMany(mappedBy = "user")
    private List<Transaction> transactions;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
