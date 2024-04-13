package com.example.vkr.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.vkr.Model.Ad;

@Repository
public interface AdRepository extends JpaRepository<Ad, Long> {
    @SuppressWarnings("null")
    List<Ad> findAll();
    
    List<Ad> findById(long id);
}
