package com.example.vkr.Controller;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.vkr.Model.Role;
import com.example.vkr.Model.User;
import com.example.vkr.Repository.UserRepository;
import com.example.vkr.Token.TokenRepository;



@RestController
@RequiredArgsConstructor
public class AdminController {
    @Autowired
    TokenRepository tokenRepository;
    @Autowired
    UserRepository userRepository;
    int elInPage = 20; // Количество элементов на странице


    @GetMapping("/users/{page}")
    @CrossOrigin(origins = "*")
    public String allusers(@PathVariable(value = "page") int id) throws JSONException{
        List<User> users = userRepository.findAll();
        String message;
        JSONObject json = new JSONObject();
        JSONArray array = new JSONArray();
        List<User> pageUsers = users.subList(elInPage*id-elInPage, ((users.size() <= elInPage*id) ? users.size() : elInPage*id));
        for (User user : pageUsers){
            JSONObject jsonuser = new JSONObject();
            jsonuser.put("id", user.getId());
            jsonuser.put("name", user.getName());
            jsonuser.put("email", user.getEmail());
            jsonuser.put("role", user.getRole());
            array.put(jsonuser);
            System.out.println(array.toString());
        }
        json.put("users", array);
        message = json.toString();
        return message;
    }

    @PostMapping("/setrole")
    @CrossOrigin(origins = "*")
    public String setRole(@RequestParam Long id, @RequestParam int role, @RequestParam int page) throws JSONException{
        User user = userRepository.findById(id.longValue()).get();
        if (role == 1) {
            user.setRole(Role.USER);
        }
        if (role == 2) { 
            user.setRole(Role.MODER);
        }
        if (role == 3) {
            user.setRole(Role.ADMIN);
        }
        userRepository.save(user);
        List<User> users = userRepository.findAll();
        String message;
        JSONObject json = new JSONObject();
        JSONArray array = new JSONArray();
        List<User> pageUsers = users.subList(elInPage*page-elInPage, ((users.size() <= elInPage*page) ? users.size() : elInPage*page));
        for (User us : pageUsers){
            JSONObject jsonuser = new JSONObject();
            jsonuser.put("id", us.getId());
            jsonuser.put("name", us.getName());
            jsonuser.put("email", us.getEmail());
            jsonuser.put("role", us.getRole());
            array.put(jsonuser);
            System.out.println(array.toString());
        }
        json.put("users", array);
        message = json.toString();
        return message;
    }
}
