package com.example.vkr.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Review {
    @EmbeddedId
    @ManyToOne
    @JoinColumn(name = "id_user")
    User id_User;

    @ManyToOne
    @JoinColumn(name = "id_author")
    User id_Author;

    String text;

    Boolean active;
}
