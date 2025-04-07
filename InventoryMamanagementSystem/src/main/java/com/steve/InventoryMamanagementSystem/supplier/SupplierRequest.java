package com.steve.InventoryMamanagementSystem.supplier;


import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SupplierRequest {

    private Long id;
    @NotBlank(message = "name is required")
    private String name;

    private String address;
}
