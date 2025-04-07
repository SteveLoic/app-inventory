package com.steve.InventoryMamanagementSystem.supplier;


import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class SupplierService {

    private final SupplierRepository supplierRepository;
    private final ModelMapper modelMapper;

    public SupplierResponse addSupplier(SupplierRequest supplierRequest) {
        Supplier supplier = Optional.of(supplierRequest)
                .filter(request -> !supplierRepository.existsByName(supplierRequest.getName()))
                .map(request -> Supplier.builder().name(supplierRequest.getName()).address(supplierRequest.getAddress()).build())
                .map(supplierRepository::save).orElseThrow(() -> new EntityExistsException("Supplier not found with category with name " + supplierRequest.getName()));

        return modelMapper.map(supplier, SupplierResponse.class);
    }

    public List<SupplierResponse> getAllSuppliers() {
        List<Supplier> suppliers = supplierRepository.findAll();
        List<SupplierResponse> responses = modelMapper.map(suppliers, new TypeToken<List<SupplierResponse>>() {
        }.getType());
        return responses;
    }

    public SupplierResponse updateSupplier(Long supplierId, SupplierRequest supplierRequest) {
        Supplier supplier = supplierRepository.findById(supplierId)
                .map(existingSupplier -> updateExistingSupplier(existingSupplier, supplierRequest))
                .map(supplierRepository::save)
                .orElseThrow(() -> new EntityNotFoundException("Supplier not found with category with name " + supplierId));
        return  modelMapper.map(supplier, SupplierResponse.class);
    }

    public SupplierResponse getSupplierById(Long supplierId) {
        Supplier supplier = supplierRepository.findById(supplierId).orElseThrow(
                ()-> new EntityNotFoundException("Supplier not found with category with name " + supplierId)
        );
        return   modelMapper.map(supplier, SupplierResponse.class);
    }

    private Supplier updateExistingSupplier(Supplier supplier, SupplierRequest supplierRequest) {
        supplier.setAddress(supplierRequest.getAddress());
        supplier.setName(supplierRequest.getName());
        return supplier;
    }

    public void deleteSupplierById(Long supplierId) {
        supplierRepository.findById(supplierId).ifPresentOrElse(
                supplierRepository::delete, () -> {
                    throw new EntityNotFoundException("Supplier not found with category with name " + supplierId);
                }
        );
    }
}
