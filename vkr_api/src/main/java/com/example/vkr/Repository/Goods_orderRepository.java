package com.example.vkr.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.vkr.Model.Product_order;

public interface Goods_orderRepository extends JpaRepository<Product_order, Long>{
    
}
