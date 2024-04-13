package com.example.vkr.Model;

import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.vkr.Token.Token;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Users")
public class User implements UserDetails {
    @Id
    @GeneratedValue
    @PrimaryKeyJoinColumn
    long id;
    Boolean active;

    @Enumerated(EnumType.STRING)
    private Role role;

    String name, surname, email, password;
    @OneToOne
    @JoinColumn(name = "id_address")
    Address address;

    @OneToOne
    @JoinColumn(name = "id_ad")
    Ad ad;

    @ManyToMany
    @JoinTable(name = "cart_user")
    Set<Cart> carts;

    @ManyToMany
    @JoinTable(name = "Orders_user")
    Set<Orders> orders;

    

    @OneToMany(mappedBy = "user")
    private List<Token> tokens;

    public User(String email, String password, Role role, String name) {
        this.active = true;
        this.password = password;
        this.email = email;
        this.role = role;
        this.name = name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isEnabled() {
        return this.active;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }
}
