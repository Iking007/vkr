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
public class Product_order {
    @Id
    @GeneratedValue
    @PrimaryKeyJoinColumn
    Long id;

    @ManyToOne
    @JoinColumn(name = "id_goods")
    Goods product;
    
    int quantity;

    double price;
}
