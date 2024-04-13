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
public class Goods_order {
    @Id
    @GeneratedValue
    @PrimaryKeyJoinColumn
    Long id;

    @ManyToOne
    @JoinColumn(name = "id_goods")
    Goods goods;

    @ManyToOne
    @JoinColumn(name = "id_order")
    Orders order;

    int quantity;

    double price;
}
