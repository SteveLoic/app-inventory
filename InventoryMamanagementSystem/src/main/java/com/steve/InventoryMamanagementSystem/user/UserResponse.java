package com.steve.InventoryMamanagementSystem.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.steve.InventoryMamanagementSystem.Transaction.TransactionResponse;
import com.steve.InventoryMamanagementSystem.enums.UserRole;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserResponse {

    private Long id;

    private String name;

    private String email;

    private String token;


    @JsonIgnore
    private String password;

    private String phoneNumber;

    private UserRole role;

    private List<TransactionResponse> transactions;

    private LocalDateTime createdAt;
}
