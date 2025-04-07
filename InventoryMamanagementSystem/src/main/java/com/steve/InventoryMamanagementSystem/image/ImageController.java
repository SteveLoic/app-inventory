package com.steve.InventoryMamanagementSystem.image;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.SQLException;

@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
@Tag(name = "image")
public class ImageController {

    private final ImageService imageService;
    @PostMapping(value = "/product/upload", consumes = {"multipart/form-data"})
    public ResponseEntity<ImageResponse> uploadImage(
            @RequestPart("file")MultipartFile file,
            @RequestParam("productId") Long productId
            ) {
        return  ResponseEntity.ok(imageService.savesImages(productId, file));
    }

    @GetMapping(value = "/image/download/{imageId}")
    public ResponseEntity<Resource> downloadImage(
            @PathVariable(name="imageId") Long imageId
    ) throws SQLException {
        Image image = imageService.getImageById(imageId);
        ByteArrayResource resource = new ByteArrayResource(image.getImage().getBytes(1, (int) image.getImage().length()));
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(image.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + image.getFileName() + "\"").body(resource);
    }

    @PatchMapping(value = "image/{imageId}/update", consumes = {"multipart/form-data"})
    public ResponseEntity<?> updateImage(@PathVariable("imageId") Long imageId, @RequestPart("file") MultipartFile file) {
        imageService.updateImage(imageId, file);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("image/{imageId}/image")
    public ResponseEntity<?> deleteImage(@PathVariable(name = "imageId") Long imageId) {
        imageService.deleteById(imageId);
        return ResponseEntity.noContent().build();

    }
}
