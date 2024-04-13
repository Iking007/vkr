package com.example.vkr.service;

import com.example.vkr.Model.User;
import com.example.vkr.Repository.UserRepository;

import java.util.HashSet;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
/**
 * \brief Класс получения аутентификационной информации.
 * \details Класс, необходимый для поиска и проверки пользователя по его email в базе данных, реализующий интерфейс UserDetailsService.
 */
@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User u = userRepository.findByEmail(email).get();
        if (Objects.isNull(u)) {
            throw new UsernameNotFoundException(String.format("User %s is not found", email));
        }
        return new org.springframework.security.core.userdetails.User(u.getEmail(), u.getPassword(), true, true, true, true, new HashSet<>());
    }
}
