package com.steve.InventoryMamanagementSystem.user;


import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;


    public UserResponse getCurrentLoggingInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new EntityNotFoundException("User not found with email " + email)
        );
        user.setTransactions(null);
        return modelMapper.map(user, UserResponse.class);
    }

    public List<UserResponse> getAllUser() {
        List<User> users = userRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        users.forEach(user -> user.setTransactions(null));
        List<UserResponse> userResponses = modelMapper.map(users, new TypeToken<List<UserResponse>>() {
        }.getType());
        return userResponses;
    }

    public UserResponse updateUser(Long userId, RegisterRequest request) {
        User user = userRepository.findById(userId)
                .map(existingsUser -> updateExistingUser(existingsUser, request))
                .map(userRepository::save).orElseThrow(
                        () -> new EntityNotFoundException("User not found with email ")
                );

        return modelMapper.map(user, UserResponse.class);
    }

    private User updateExistingUser(User user, RegisterRequest request) {
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setRole(request.getUserRole());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        return user;
    }

    public void deleteUser(Long userId) {
        userRepository.findById(userId).ifPresentOrElse(
                userRepository::delete, () -> {
                    new EntityNotFoundException("User not found with id " + userId);
                }
        );
    }

    public UserResponse getUserTransactions(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new EntityNotFoundException("User not found with id " + userId)
        );

        UserResponse userResponse = modelMapper.map(user, UserResponse.class);
        userResponse.getTransactions().forEach(transactionResponse -> {
            transactionResponse.setUser(null);
            transactionResponse.setSupplier(null);
        });
        return  userResponse;
    }
}
