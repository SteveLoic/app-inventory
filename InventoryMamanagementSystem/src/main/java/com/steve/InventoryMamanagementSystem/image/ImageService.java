package com.steve.InventoryMamanagementSystem.image;


import com.steve.InventoryMamanagementSystem.product.Product;
import com.steve.InventoryMamanagementSystem.product.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.SQLException;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImageService {

    private final ImageRepository imageRepository;

    private final ProductRepository productRepository;


    void deleteById(Long imageId) {
        imageRepository.findById(imageId).ifPresentOrElse(
                imageRepository::delete, () -> {
                    throw new EntityNotFoundException("Image not found with Id" + imageId);
                }
        );
    }

    Image getImageById(Long imageId) {
       return  imageRepository.findById(imageId).orElseThrow(
                ()-> new EntityNotFoundException("Image not found with Id" + imageId)
        );
    }

    void updateImage(Long imageId, MultipartFile file) {
        Image image = this.getImageById(imageId);
        try{
            image.setFileName(file.getOriginalFilename());
            image.setFileType(file.getContentType());
            image.setImage(new SerialBlob(file.getBytes()));
            imageRepository.save(image);

        } catch (IOException | SQLException e) {
           throw  new RuntimeException(e.getMessage());
        }
    }

   ImageResponse savesImages(Long productId, MultipartFile file) {
       Product product =  productRepository.findById(productId).orElseThrow(
               ()-> new EntityNotFoundException("Product not found with Id" + productId)
       );
       ImageResponse response = null;
       try {
           Image image = new Image();
           image.setFileName(file.getOriginalFilename());
           image.setFileType(file.getContentType());
           image.setImage(new SerialBlob(file.getBytes()));
           image.setProduct(product);

           String buildDownloadUrl ="/api/v1/images/image/download/";
           String downloadUrl = buildDownloadUrl + image.getId();
           image.setDownloadUrl(downloadUrl);

           Image savedImage = imageRepository.save(image);
           savedImage.setDownloadUrl(buildDownloadUrl + savedImage.getId());
           imageRepository.save(savedImage);
           response = ImageResponse.builder().id(savedImage.getId()).fileName(savedImage.getFileName()).downloadUrl(savedImage.getDownloadUrl()).build();

       } catch ( IOException | SQLException ex) {
           new RuntimeException(ex.getMessage());
       }
       return  response;
   }
}
