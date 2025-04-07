package com.steve.InventoryMamanagementSystem.Transaction;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.steve.InventoryMamanagementSystem.enums.TransactionStatus;
import com.steve.InventoryMamanagementSystem.enums.TransactionType;
import com.steve.InventoryMamanagementSystem.product.Product;
import com.steve.InventoryMamanagementSystem.product.ProductResponse;
import com.steve.InventoryMamanagementSystem.supplier.Supplier;
import com.steve.InventoryMamanagementSystem.supplier.SupplierResponse;
import com.steve.InventoryMamanagementSystem.user.User;
import com.steve.InventoryMamanagementSystem.user.UserResponse;
import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class TransactionResponse {

    private Long id;

    private Integer totalProducts;

    private BigDecimal totalPrice;


    private TransactionType transactionType;

    private TransactionStatus transactionStatus;

    private String description;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private UserResponse user;

    private ProductResponse product;

    private SupplierResponse supplier;



}
