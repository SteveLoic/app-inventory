package com.steve.InventoryMamanagementSystem.category;


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
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    public CategoryResponse addCategory(CategoryRequest categoryRequest) {
        Category category = Optional.of(categoryRequest)
                .filter(request -> !categoryRepository.existsByName(categoryRequest.getName()))
                .map(request -> Category.builder().name(categoryRequest.getName()).build())
                .map(categoryRepository::save)
                .orElseThrow(() -> new EntityExistsException("Category already exists with " + categoryRequest.getName()));
        return modelMapper.map(category, CategoryResponse.class);
    }

    public List<CategoryResponse> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryResponse> categoryResponses = modelMapper.map(categories, new TypeToken<List<CategoryResponse>>() {
        }.getType());
        return categoryResponses;
    }

    public CategoryResponse getCategoryById(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(
                () -> new EntityNotFoundException("Category not found with category with id " + categoryId)
        );
        return modelMapper.map(category, CategoryResponse.class);
    }

    public void deleteCategory(Long categoryId) {
        categoryRepository.findById(categoryId).ifPresentOrElse(
                categoryRepository::delete, () -> {
                    throw new EntityNotFoundException("Category not found with category with id " + categoryId);
                }
        );

    }

    public CategoryResponse updateCategory(Long categoryId, CategoryRequest categoryRequest) {
        Category category = categoryRepository.findById(categoryId)
                .map(existingsCategory -> updateExistingCategory(existingsCategory, categoryRequest))
                .map(categoryRepository::save).orElseThrow(
                        () -> new EntityNotFoundException("Category not found with category with name " + categoryRequest.getName())
                );

        return modelMapper.map(category, CategoryResponse.class);
    }

    private Category updateExistingCategory(Category existingCategory, CategoryRequest categoryRequest) {
        existingCategory.setName(categoryRequest.getName());
        return existingCategory;
    }


}
