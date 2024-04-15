package com.example.vkr.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.vkr.Model.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long>{
    Optional<Orders> findById(Long id);
    List<Orders> findAll();
    List<Orders> findAllByProcessed(boolean processed);
}
