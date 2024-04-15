package com.example.vkr.Model;

import java.util.List;

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
public class Orders {
    @Id
    @GeneratedValue
    @PrimaryKeyJoinColumn
    private Long id;

    boolean processed;

    @ManyToMany
    @JoinTable(name="goods_orders")
    List<Product_order> goods_orders;

    String address;

    private double price;

}
