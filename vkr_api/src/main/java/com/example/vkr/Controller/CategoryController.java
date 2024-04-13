package com.example.vkr.Controller;

import java.util.Arrays;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.vkr.Model.Category;
import com.example.vkr.Model.User;
import com.example.vkr.Repository.CategoryRepository;
import com.example.vkr.Requests.CategoryRequest;
import com.example.vkr.Token.TokenRepository;

@RestController
public class CategoryController {
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    TokenRepository tokenRepository;

    @GetMapping("/categories")
    @CrossOrigin(origins = "*")
    public String AllCategories(@RequestHeader(value="Authorization", required=false) String token) throws JSONException{
        List<Category> categories = categoryRepository.findAll();
        String message;
        JSONObject json = new JSONObject();
        json.put("categories", categories.toArray());
        if (token != null){
            token = token.substring(7,token.length());
            String [] roles = {"MODER", "ADMIN"};
            User user = tokenRepository.findByToken(token).get().getUser();
            if(Arrays.asList(roles).contains(user.getRole().name())){ // Проверка роли пользователя
                json.put("access_level", 2);
            }
            else if(user.getRole().name() == "USER"){
                json.put("access_level", 0);
            }
        }
        message = json.toString();
        System.out.println(message);
        return message;
    }
    
    @PostMapping("/addcategory")
    @CrossOrigin(origins = "*")
    public String AddCategory(@RequestBody CategoryRequest request){
        Category category = Category.builder().title(request.getTitle()).description(request.getStr()).build();
        categoryRepository.save(category);
        return "null";
    }

}
