package com.example.vkr.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.vkr.Model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{
    List<Category> findAll();
    Optional<Category> findById(Long id);

}
