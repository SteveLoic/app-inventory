package com.steve.InventoryMamanagementSystem.Transaction;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class TransactionRequest {


    @Positive(message = "Product id is required")
    private Long productId;

    @Positive(message = "Quantity id is required")
    private Integer quantity;

    private Long supplierId;

    private String description;
}
