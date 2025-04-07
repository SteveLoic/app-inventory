package com.steve.InventoryMamanagementSystem.user;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(("/users"))
@RequiredArgsConstructor
@Tag(name = "Users")
public class UserController {

    private final UserService userService;


    @GetMapping("/all")
    //@PreAuthorize("hasAuthority('ADMIN')")
    private ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUser());
    }

    @PutMapping("/update/{userId}/user")
    public ResponseEntity<UserResponse> udpateUser(@PathVariable(name = "userId") Long userId, @RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(userService.updateUser(userId, registerRequest));
    }

    @DeleteMapping("/delete/{userId}/user")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<UserResponse> deleteUser(@PathVariable(name = "userId") Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/transactions/{userId}")
    private ResponseEntity<UserResponse> getAllTransactionsByUser(@PathVariable(name = "userId") Long userId) {
        return ResponseEntity.ok(userService.getUserTransactions(userId));
    }

    @GetMapping("/current/user")
    private ResponseEntity<UserResponse> getCurrentLoggingInUser() {
        UserResponse userResponse = userService.getCurrentLoggingInUser();
        return ResponseEntity.ok(userService.getCurrentLoggingInUser());
    }




}
