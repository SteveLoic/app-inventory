package com.steve.InventoryMamanagementSystem.product;


import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@Tag(name = "Products")
@Slf4j
public class ProductController {

    private final ProductService productService;

    @GetMapping("/all")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }


 /*   @PostMapping(value = "/product/add")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ProductResponse> addProduct(@RequestBody @Valid ProductRequest productRequest) {
        return ResponseEntity.ok(productService.addProduct(productRequest));
    }*/

    @PostMapping(value = "/product/add")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ProductResponse> addProduct(
            @RequestBody @Valid ProductRequest productRequest
    ) {
        return ResponseEntity.ok(productService.addProduct(productRequest));
    }



    @DeleteMapping("/product/{productId}/product")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ProductResponse> deleteProductById(@PathVariable(name = "productId") Long productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("product/{productId}/product")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable(name = "productId") Long productId) {
        return ResponseEntity.ok(productService.getProductById(productId));
    }

    @PutMapping(value = "/product/{productId}/product")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ProductResponse> updateProduct(
            @RequestBody  ProductRequest productRequest,
            @PathVariable(name = "productId") Long productId
    ) {
        return ResponseEntity.ok(productService.updateProduct(productId, productRequest));
    }

}
