package com.example.vkr.Controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.vkr.Model.User;
import com.example.vkr.Repository.GoodsRepository;
import com.example.vkr.Repository.UserRepository;
import com.example.vkr.Requests.AuthenticationRequest;
import com.example.vkr.Requests.RegisterRequest;
import com.example.vkr.Token.TokenRepository;
import com.example.vkr.auth.AuthenticationResponse;
import com.example.vkr.auth.AuthenticationService;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService service;

    @Autowired
    TokenRepository tokenRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    GoodsRepository goodsRepository;

    @PostMapping("/reg")
    @CrossOrigin(origins = "*")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        if (userRepository.findByEmail(request.getEmail()).isPresent()){
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "*")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(service.authenticate(request));
    }

    @GetMapping("/prof")
    @CrossOrigin(origins = "*")
    public String profile(@RequestHeader("Authorization") String token) throws JSONException{
        JSONObject json = new JSONObject();
        JSONObject jsonUser = new JSONObject();
        String message;
        //  System.out.println(token);
        token = token.substring(7,token.length());
        System.out.println(token);
        User user = tokenRepository.findByToken(token).get().getUser();

        if(user.getRole().name() == "ADMIN"){ // Проверка роли пользователя
            json.put("access_level", 2);
        }
        else if(user.getRole().name() == "MODER"){
            json.put("access_level", 1);
        }
        else{
            json.put("access_level", 0);

        }
        List<User> userList = new ArrayList<>();
        userList.add(user);
        jsonUser.put("name", user.getName());
        jsonUser.put("surname", user.getSurname());
        jsonUser.put("role", user.getRole());
        jsonUser.put("email", user.getEmail());
        jsonUser.put("ad", user.getAd().getId());
        json.put("user", jsonUser);
        //System.out.println(user.getName());
        message = json.toString();
        return message;
    }

}
