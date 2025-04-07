package com.steve.InventoryMamanagementSystem.image;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageResponse {
    private Long id;
    private String fileName;
    private String downloadUrl;
}
