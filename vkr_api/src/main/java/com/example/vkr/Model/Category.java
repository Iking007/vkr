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
public class Category {
    @Id
    @GeneratedValue
    @PrimaryKeyJoinColumn
    private Long id;

    private String title;
    @Column(columnDefinition="text")
    private String description;
}
