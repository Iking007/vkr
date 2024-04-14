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
public class Ad {
    @Id
    @GeneratedValue
    @PrimaryKeyJoinColumn
    Long id;

    String title, image;
    @Column(columnDefinition="text")
    String description;

    String telegram;

    Boolean active;

    double price;
}
