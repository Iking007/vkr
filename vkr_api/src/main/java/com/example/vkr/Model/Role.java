package com.example.vkr.Model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.example.vkr.Model.Permission.ADMIN_CREATE;
import static com.example.vkr.Model.Permission.ADMIN_DELETE;
import static com.example.vkr.Model.Permission.ADMIN_READ;
import static com.example.vkr.Model.Permission.ADMIN_UPDATE;
import static com.example.vkr.Model.Permission.MODER_CREATE;
import static com.example.vkr.Model.Permission.MODER_DELETE;
import static com.example.vkr.Model.Permission.MODER_READ;
import static com.example.vkr.Model.Permission.MODER_UPDATE;

@RequiredArgsConstructor
public enum Role {
    USER(Collections.emptySet()),
    ADMIN(
            Set.of(
                    ADMIN_READ,
                    ADMIN_UPDATE,
                    ADMIN_DELETE,
                    ADMIN_CREATE,
                    MODER_READ,
                    MODER_UPDATE,
                    MODER_DELETE,
                    MODER_CREATE
            )
    ),
    MODER(
            Set.of(
                    MODER_READ,
                    MODER_UPDATE,
                    MODER_DELETE,
                    MODER_CREATE
            )
    );

    @Getter
    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
