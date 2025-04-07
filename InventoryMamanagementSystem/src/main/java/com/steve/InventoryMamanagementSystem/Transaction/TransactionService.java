package com.steve.InventoryMamanagementSystem.Transaction;


import com.steve.InventoryMamanagementSystem.common.PageResponse;
import com.steve.InventoryMamanagementSystem.enums.TransactionStatus;
import com.steve.InventoryMamanagementSystem.enums.TransactionType;
import com.steve.InventoryMamanagementSystem.exceptions.NameValueRequiredException;
import com.steve.InventoryMamanagementSystem.product.Product;
import com.steve.InventoryMamanagementSystem.product.ProductRepository;
import com.steve.InventoryMamanagementSystem.supplier.Supplier;
import com.steve.InventoryMamanagementSystem.supplier.SupplierRepository;
import com.steve.InventoryMamanagementSystem.user.User;
import com.steve.InventoryMamanagementSystem.user.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransactionService {

    private final TransactionRepository transactionRepository;

    private final SupplierRepository supplierRepository;

    private final ProductRepository productRepository;

    private final ModelMapper modelMapper;

    private final UserService userService;

    public TransactionResponse restockInventory(TransactionRequest transactionRequest) {
        Long productId = transactionRequest.getProductId();
        Long supplierId = transactionRequest.getSupplierId();
        Integer quantity = transactionRequest.getQuantity();
        if (Objects.equals(supplierId, null)) throw new NameValueRequiredException("Supplier Id is Required");

        Product product = productRepository.findById(productId).orElseThrow(
                () -> new EntityNotFoundException("Product not found with id " + productId)
        );

        Supplier supplier = supplierRepository.findById(supplierId).orElseThrow(
                () -> new EntityNotFoundException("Supplier not found with id " + supplierId)
        );

        User user = modelMapper.map(userService.getCurrentLoggingInUser(), User.class);
        product.setStockQuantity(product.getStockQuantity() + quantity);

        Transaction transaction = Transaction.builder()
                .transactionType(TransactionType.PURCHASE)
                .transactionStatus(TransactionStatus.COMPLETED)
                .product(product)
                .supplier(supplier)
                .user(user)
                .totalProducts(quantity)
                .totalPrice(product.getPrice().multiply(BigDecimal.valueOf(quantity)))
                .description(transactionRequest.getDescription())
                .build();

        transactionRepository.save(transaction);
        return modelMapper.map(transaction, TransactionResponse.class);
    }

    public TransactionResponse sell(TransactionRequest transactionRequest) {
        Long productId = transactionRequest.getProductId();
        Integer quantity = transactionRequest.getQuantity();

        Product product = productRepository.findById(productId).orElseThrow(
                () -> new EntityNotFoundException("Product not found with id " + productId)
        );

        User user = modelMapper.map(userService.getCurrentLoggingInUser(), User.class);
        var total = product.getStockQuantity() - quantity;
        product.setStockQuantity(product.getStockQuantity() - quantity);

        Transaction transaction = Transaction.builder()
                .transactionType(TransactionType.SALE)
                .transactionStatus(TransactionStatus.COMPLETED)
                .product(product)
                .user(user)
                .totalProducts(quantity)
                .totalPrice(product.getPrice().multiply(BigDecimal.valueOf(quantity)))
                .description(transactionRequest.getDescription())
                .build();

        transactionRepository.save(transaction);
        return modelMapper.map(transaction, TransactionResponse.class);
    }

    public TransactionResponse returnToSupplier(TransactionRequest transactionRequest) {
        Long productId = transactionRequest.getProductId();
        Long supplierId = transactionRequest.getSupplierId();
        Integer quantity = transactionRequest.getQuantity();
        if (Objects.equals(supplierId, null)) throw new NameValueRequiredException("Supplier Id is Required");

        Product product = productRepository.findById(productId).orElseThrow(
                () -> new EntityNotFoundException("Product not found with id " + productId)
        );

        Supplier supplier = supplierRepository.findById(supplierId).orElseThrow(
                () -> new EntityNotFoundException("Supplier not found with id " + supplierId)
        );

        User user = modelMapper.map(userService.getCurrentLoggingInUser(), User.class);
        product.setStockQuantity(product.getStockQuantity() - quantity);

        Transaction transaction = Transaction.builder()
                .transactionType(TransactionType.RETURN_SUPPLIER)
                .transactionStatus(TransactionStatus.PROCESSING)
                .product(product)
                .supplier(supplier)
                .user(user)
                .totalProducts(quantity)
                .totalPrice(product.getPrice().multiply(BigDecimal.valueOf(quantity)))
                .description(transactionRequest.getDescription())
                .build();

        transactionRepository.save(transaction);
        return modelMapper.map(transaction, TransactionResponse.class);
    }

    public PageResponse<TransactionResponse> getAllTransaction(int page, int size, String search) {
        Pageable pageableRequest = PageRequest.of(page, size);
        //Page<Transaction> transactions = transactionRepository.searchTransactions(search, pageableRequest);
        Page<Transaction> transactions = transactionRepository.findAll(pageableRequest);
        List<TransactionResponse> responses = modelMapper.map(transactions.get().toList(), new TypeToken<List<TransactionResponse>>(){}.getType());

        responses.forEach(response -> {
            response.setUser(null);
            response.setProduct(null);
            response.setSupplier(null);
        });

        return new PageResponse<>(
                responses,
                transactions.getNumber(),
                transactions.getSize(),
                transactions.getTotalElements(),
                transactions.getTotalPages()
        );
    }

    public TransactionResponse getTransactionById(Long transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId).orElseThrow(
                () -> new EntityNotFoundException("transaction not found with id " + transactionId)
        );
        TransactionResponse transactionResponse = modelMapper.map(transaction, TransactionResponse.class);
        transactionResponse.getUser().setTransactions(null);
        return transactionResponse;
    }

    public TransactionResponse updateTransactionStatus(Long transactionId, TransactionStatus transactionStatus) {

        Transaction transaction = transactionRepository.findById(transactionId)
                .map(existingsTransaction -> {
                    existingsTransaction.setTransactionStatus(transactionStatus);
                    return existingsTransaction;
                }).map(transactionRepository::save).orElseThrow(
                        () -> new EntityNotFoundException("transaction not found with id " + transactionId)
                );

        return modelMapper.map(transaction, TransactionResponse.class);
    }

    public List<TransactionResponse> getAllTransactionByMonthAndYear(int month, int Year) {
        List<Transaction> transactions = transactionRepository.findAllByMonthAndYear(month, Year);

        List<TransactionResponse> responses = modelMapper.map(transactions, new TypeToken<List<TransactionResponse>>() {
        }.getType());

        responses.forEach(response -> {
            response.setUser(null);
            response.setProduct(null);
            response.setSupplier(null);
        });
        return responses;
    }

}
