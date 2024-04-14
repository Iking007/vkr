package com.example.vkr.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.vkr.Model.Cart;
import com.example.vkr.Model.Goods;

public interface CartRepository extends JpaRepository<Cart, Long>{
    List<Cart> findAllByGoods(Goods goods);
    
}
