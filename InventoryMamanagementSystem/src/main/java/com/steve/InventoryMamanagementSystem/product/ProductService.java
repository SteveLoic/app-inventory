package com.steve.InventoryMamanagementSystem.product;


import com.steve.InventoryMamanagementSystem.category.Category;
import com.steve.InventoryMamanagementSystem.category.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    private final ModelMapper modelMapper;


    public ProductResponse addProduct(ProductRequest productRequest) {

        Category category = categoryRepository.findById(productRequest.getCategoryId()).orElseThrow(
                () ->new EntityNotFoundException("Category not found with id " + productRequest.getCategoryId()
                        )
        );

        Product product = modelMapper.map(productRequest, Product.class);
        product.setCategory(category);
        Product savedProduct = productRepository.save(product);
        return modelMapper.map(savedProduct, ProductResponse.class);
    }


    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductResponse> responses = modelMapper.map(products, new TypeToken<List<ProductResponse>>() {
        }.getType());
        return responses;
    }


    public ProductResponse getProductById(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(
                () -> new EntityNotFoundException("Product not found with id " + productId)
        );
        return modelMapper.map(product, ProductResponse.class);
    }

    public ProductResponse updateProduct(Long productId, ProductRequest productRequest) {

        Product product = productRepository.findById(productId)
                .map(existingProduct -> updateExistingProduct(existingProduct, productRequest))
                .map(productRepository::save).orElseThrow(
                        () -> new EntityNotFoundException("Product not found with id " + productId)
                );

        return modelMapper.map(product, ProductResponse.class);
    }

    private Product updateExistingProduct(Product product, ProductRequest productRequest) {


        Category category = categoryRepository.findById(productRequest.getId()).orElseThrow(
                ()-> new EntityNotFoundException("Category not found with id " + productRequest.getCategoryId())
        );

        product.setName(productRequest.getName());
        product.setSku(productRequest.getSku());
        product.setPrice(productRequest.getPrice());
        product.setStockQuantity(productRequest.getStockQuantity());
        product.setDescription(productRequest.getDescription());
        product.setExpiryDate(productRequest.getExpiryDate());
        product.setCategory(category);
        return product;
    }

    public void deleteProduct(Long productId) {
        productRepository.findById(productId).ifPresentOrElse(
           productRepository::delete,
                () -> {
                    throw new EntityNotFoundException("Product not found with name " + productId);
                }
        );
    }


}
