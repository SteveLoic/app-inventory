package com.steve.InventoryMamanagementSystem.Transaction;


import com.steve.InventoryMamanagementSystem.common.PageResponse;
import com.steve.InventoryMamanagementSystem.enums.TransactionStatus;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
@Tag(name = "Transactions")
@Slf4j
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping("/all")
    public ResponseEntity<PageResponse<TransactionResponse>> getAllTransactions(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "search", required = false) String search
    ) {
        return ResponseEntity.ok(transactionService.getAllTransaction(page, size, search));
    }

    @GetMapping("/all/by/month/year")
    public ResponseEntity<List<TransactionResponse>> getAllTransactionsByMonthAndYear(
            @RequestParam(name = "month") int month,
            @RequestParam(name = "year") int year
    ) {
        return ResponseEntity.ok(transactionService.getAllTransactionByMonthAndYear(year, month));
    }

    @PostMapping("/product/purchase")
    public ResponseEntity<TransactionResponse> restockInventory(@RequestBody @Valid TransactionRequest transactionRequest) {
        return ResponseEntity.ok(transactionService.restockInventory(transactionRequest));
    }

    @PostMapping("/product/sell")
    public ResponseEntity<TransactionResponse> sell(@RequestBody @Valid TransactionRequest transactionRequest) {
        return ResponseEntity.ok(transactionService.sell(transactionRequest));
    }

    @PostMapping("/product/return")
    public ResponseEntity<TransactionResponse> returnToSupplier(@RequestBody @Valid TransactionRequest transactionRequest) {
        return ResponseEntity.ok(transactionService.returnToSupplier(transactionRequest));
    }

    @PutMapping("/transaction/{transactionId}/transaction")
    public ResponseEntity<TransactionResponse> updateTransactionStatus(@PathVariable(name = "transactionId") Long transactionId, @RequestBody TransactionStatus status) {
        return ResponseEntity.ok(transactionService.updateTransactionStatus(transactionId, status));
    }

    @GetMapping("/transaction/{transactionId}/transaction")
    public ResponseEntity<TransactionResponse> getTransactionById(@PathVariable(name = "transactionId") Long transactionId) {
        return ResponseEntity.ok(transactionService.getTransactionById(transactionId));
    }


}
