package com.example.vkr.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.vkr.Model.Address;

public interface AddressRepository extends JpaRepository<Address, Long>{
    
}
