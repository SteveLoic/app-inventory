package com.steve.InventoryMamanagementSystem.product;


import com.steve.InventoryMamanagementSystem.Transaction.Transaction;
import com.steve.InventoryMamanagementSystem.category.Category;
import com.steve.InventoryMamanagementSystem.image.Image;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "products")
public class Product {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "name is required")
    private String name;

    @NotBlank(message = "sku is required")
    private String sku;

    @Positive(message = "price must be a positive value")
    private BigDecimal price;


    @Positive(message = "stockQuantity must be a positive value")
    @Min(value = 0, message = "Stock Quantity cannot lesser than zero")
    private Integer stockQuantity;

    @NotBlank(message = "description is required")
    private String description;

    @OneToMany(mappedBy = "product" , cascade = CascadeType.ALL)
    private List<Image> images;


    private LocalDateTime expiryDate;


    @UpdateTimestamp
    @Column(insertable = false)
    private LocalDateTime updatedAt;


    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Transaction> transactions;
}
