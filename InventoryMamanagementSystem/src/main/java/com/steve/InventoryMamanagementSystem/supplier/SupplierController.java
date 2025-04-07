package com.steve.InventoryMamanagementSystem.supplier;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/suppliers")
@Tag(name = "Suppliers")
@Slf4j
public class SupplierController {

    private final SupplierService supplierService;

    @GetMapping("/all")
    public ResponseEntity<List<SupplierResponse>> getAllSuppliers() {
        return ResponseEntity.ok(supplierService.getAllSuppliers());
    }

    @PostMapping("/supplier/add")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<SupplierResponse> addSupplier(@RequestBody SupplierRequest supplierRequest) {
        return ResponseEntity.ok(supplierService.addSupplier(supplierRequest));
    }

    @PutMapping("/supplier/{supplierId}/supplier")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<SupplierResponse> updateSupplierById(@PathVariable(name = "supplierId") Long supplierId, @RequestBody SupplierRequest supplierRequest) {
        return ResponseEntity.ok(supplierService.updateSupplier(supplierId, supplierRequest));
    }


    @GetMapping("/supplier/{supplierId}/supplier")
    public ResponseEntity<SupplierResponse> getSupplierById(@PathVariable(name = "supplierId") Long supplierId) {
        supplierService.deleteSupplierById(supplierId);
        return ResponseEntity.ok(supplierService.getSupplierById(supplierId));
    }

    @DeleteMapping("/supplier/{supplierId}/supplier")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<SupplierResponse> deleteSupplierById(@PathVariable(name = "supplierId") Long supplierId) {
        supplierService.deleteSupplierById(supplierId);
        return ResponseEntity.noContent().build();
    }
}
