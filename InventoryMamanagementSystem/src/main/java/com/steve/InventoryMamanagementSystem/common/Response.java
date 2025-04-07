package com.steve.InventoryMamanagementSystem.common;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.steve.InventoryMamanagementSystem.enums.UserRole;
import com.steve.InventoryMamanagementSystem.user.UserResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {
    private int status;
    private  String message;

    //Login
    private  String token;
    private UserRole userRole;
    private String expirationTime;


    //for Pagination
    private Integer totalInteger;
    private Long totalElement;

    // for UserDto
    private UserResponse userResponse;
    private List<UserResponse> users;

}
