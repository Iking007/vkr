package com.example.vkr.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.vkr.Model.Ad;

@Repository
public interface AdRepository extends JpaRepository<Ad, Long> {
    List<Ad> findAllByActive(boolean active);
    
    List<Ad> findById(long id);

    @Query("""
        SELECT b FROM Ad b WHERE LOWER(b.title) LIKE CONCAT('%', LOWER(:title), '%') AND b.active = :active
            """) 
    List<Ad> searchByTitleAndActive(@Param("title") String title, @Param("active") boolean active);
}
