package com.steve.InventoryMamanagementSystem.common;

import lombok.*;

import java.util.List;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PageResponse <T>{
    private List<T> contents;
    private int number;
    private int size;
    private Long totalElements;
    private int totalPages;
}
