package com.example.vkr.Model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {
    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    MODER_READ("moder:read"),
    MODER_UPDATE("moder:update"),
    MODER_CREATE("moder:create"),
    MODER_DELETE("moder:delete");

    @Getter
    private final String permission;
}
