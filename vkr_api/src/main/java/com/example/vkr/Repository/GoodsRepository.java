package com.example.vkr.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.vkr.Model.Category;
import com.example.vkr.Model.Goods;

@Repository
public interface GoodsRepository extends JpaRepository<Goods, Long> {
    List<Goods> findAll();
    List<Goods> findAllByActive(boolean active);
    @Query("""
        SELECT b FROM Goods b WHERE b.category = :category
            """)
    List<Goods> searchByCategory(@Param("category") Category category);
    @Query("""
        SELECT b FROM Goods b WHERE b.category = :category AND b.active = :active
            """) 
    List<Goods> searchByCategoryAndActive(@Param("category") Category category,@Param("active") boolean active);
    @Query("""
        SELECT b FROM Goods b WHERE LOWER(b.title) LIKE CONCAT('%', LOWER(:title), '%') AND b.active = :active
            """) 
    List<Goods> searchByTitleAndActive(@Param("title") String title, @Param("active") boolean active);
    Optional<Goods> findById(long id);
}
