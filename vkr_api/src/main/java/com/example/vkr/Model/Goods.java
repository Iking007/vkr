package com.example.vkr.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Goods {
    @Id
    @GeneratedValue
    @PrimaryKeyJoinColumn
    private Long id;
    private Boolean active;

    private double price;

    private String title, image;
    @Column(columnDefinition="text")
    private String description;

    @ManyToOne
    private Category category;
}
