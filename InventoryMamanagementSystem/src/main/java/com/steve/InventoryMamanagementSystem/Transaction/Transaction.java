package com.steve.InventoryMamanagementSystem.Transaction;


import com.steve.InventoryMamanagementSystem.enums.TransactionStatus;
import com.steve.InventoryMamanagementSystem.enums.TransactionType;
import com.steve.InventoryMamanagementSystem.product.Product;
import com.steve.InventoryMamanagementSystem.supplier.Supplier;
import com.steve.InventoryMamanagementSystem.user.User;
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
@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Positive(message = "TotalProducts must be a positive value")
    private Integer totalProducts;

    @Positive(message = "Total must be a positive value")
    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;

    @Enumerated(EnumType.STRING)
    private TransactionStatus transactionStatus;

    private String description;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @Column(insertable = false)
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;









}
