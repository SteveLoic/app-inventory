package com.steve.InventoryMamanagementSystem.category;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@AllArgsConstructor
@Tag(name = "Categories")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/all")
    public ResponseEntity<List<CategoryResponse>> getAllResponse() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @PostMapping("/category/add")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CategoryResponse> addCategory(@RequestBody CategoryRequest categoryRequest) {
        return ResponseEntity.ok(categoryService.addCategory(categoryRequest));
    }

    @GetMapping("/category/{categoryId}/category")
    public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable (name = "categoryId")Long categoryId) {
        return ResponseEntity.ok(categoryService.getCategoryById(categoryId));
    }

    @PutMapping("/category/{categoryId}/category")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CategoryResponse> updateCategory(@PathVariable (name = "categoryId")Long categoryId, @RequestBody CategoryRequest categoryRequest) {
        return ResponseEntity.ok(categoryService.updateCategory(categoryId, categoryRequest));
    }

    @DeleteMapping("/category/{categoryId}/category")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CategoryResponse> deleteCategoryById(@PathVariable (name = "categoryId")Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.noContent().build();
    }

}
