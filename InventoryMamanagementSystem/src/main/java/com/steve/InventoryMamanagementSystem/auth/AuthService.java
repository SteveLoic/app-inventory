package com.steve.InventoryMamanagementSystem.auth;


import com.steve.InventoryMamanagementSystem.enums.UserRole;
import com.steve.InventoryMamanagementSystem.exceptions.InvalidCredentialHandler;
import com.steve.InventoryMamanagementSystem.security.JwtUtils;
import com.steve.InventoryMamanagementSystem.user.*;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final JwtUtils jwtUtils;

    public AuthRegisterResponse registerUser(RegisterRequest registerRequest) {
        User user = Optional.of(registerRequest)
                .filter(request -> !userRepository.existsByEmail(request.getEmail()))
                .map(request -> {
                    UserRole userRole = UserRole.MANAGER;
                    if (!Objects.equals(registerRequest.getUserRole(), null)) {
                        userRole = registerRequest.getUserRole();
                    }
                    return User.builder()
                            .name(registerRequest.getName())
                            .phoneNumber(registerRequest.getPhoneNumber())
                            .email(registerRequest.getEmail())
                            .password(passwordEncoder.encode(registerRequest.getPassword()))
                            .role(userRole)
                            .build();
                })
                .map(userRepository::save)
                .orElseThrow(() -> new EntityExistsException("User already exists with email " + registerRequest.getEmail()));

        return modelMapper.map(user, AuthRegisterResponse.class);
    }

    public AuthLoginResponse loginUser(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(
                () -> new EntityNotFoundException("User not found with email " + loginRequest.getEmail())
        );

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new InvalidCredentialHandler("Password does not match, Please provide the rigth password");
        }

        String token = jwtUtils.generateToken(user.getEmail());

        return AuthLoginResponse.builder()
                .name(user.getName())
                .phoneNumber(user.getPhoneNumber())
                .token(token)
                .role(user.getRole())
                .email(user.getEmail())
                .build();
    }

}
