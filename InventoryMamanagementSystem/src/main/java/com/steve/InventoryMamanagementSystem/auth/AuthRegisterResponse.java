package com.steve.InventoryMamanagementSystem.auth;

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
public class AuthRegisterResponse {

    @JsonIgnore
    private Long id;

    private String name;

    private String email;

    private String token;


    @JsonIgnore
    private String password;


    private String phoneNumber;

    private UserRole role;

    @JsonIgnore
    private List<TransactionResponse> transactions;

    @JsonIgnore
    private LocalDateTime createdAt;
}
