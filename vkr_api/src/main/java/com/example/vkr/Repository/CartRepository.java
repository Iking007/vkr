package com.example.vkr.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.vkr.Model.Cart;
import com.example.vkr.Model.Goods;
import com.example.vkr.Model.User;

public interface CartRepository extends JpaRepository<Cart, Long>{
    @Query("""
        SELECT b FROM Cart b WHERE b.user = :user
            """)
    List<Cart> searchByUser(@Param("user")User user);
    @Query("""
        SELECT b FROM Cart b WHERE b.user = :user and b.goods = :goods
            """)
    Optional<Cart> searchByUserAndGoods(@Param("user") User user, @Param("goods") Goods goods); 
    
}
