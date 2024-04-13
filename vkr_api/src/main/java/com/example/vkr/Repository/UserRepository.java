package com.example.vkr.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.vkr.Model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    @SuppressWarnings("null")
    List<User> findAll();

    Optional<User> findByEmail(String email);
}
