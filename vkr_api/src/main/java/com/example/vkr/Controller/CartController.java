package com.example.vkr.Controller;

import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.vkr.Model.Cart;
import com.example.vkr.Model.User;
import com.example.vkr.Repository.CartRepository;
import com.example.vkr.Repository.GoodsRepository;
import com.example.vkr.Repository.UserRepository;
import com.example.vkr.Requests.CartRequest;
import com.example.vkr.Token.TokenRepository;

@RestController
public class CartController {
    @Autowired
    GoodsRepository goodsRepository;
    @Autowired
    TokenRepository tokenRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CartRepository cartRepository;

    @PostMapping("/cart")
    public void NewOrDelCart(@RequestBody CartRequest request, @RequestHeader("Authorization") String token){
        token = token.substring(7,token.length());
        if(request.isAdd()){
            User user = tokenRepository.findByToken(token).get().getUser();
            Cart cart = Cart.builder()
                .user(user)
                .goods(goodsRepository.findById(request.getProduct_id()).get())
                .quantity(1)
                .build();
            cartRepository.save(cart);
            user.getCarts().add(cart);
            userRepository.save(user);

        }
        else{
            Cart cart = cartRepository.searchByUserAndGoods(tokenRepository.findByToken(token).get().getUser(), goodsRepository.findById(request.getProduct_id()).get()).get();
            cartRepository.delete(cart);
        }
    }
    @GetMapping("/mycart")
    public String MyCart(@RequestHeader("Authorization") String token) throws JSONException{
        token = token.substring(7,token.length());
        List<Cart> carts = cartRepository.searchByUser(tokenRepository.findByToken(token).get().getUser());
        String message = "";
        JSONObject json = new JSONObject();
        System.out.println(carts.toString());
        json.put("carts", carts);
        message = json.toString();
        System.out.println(message);
        return message;
    }
}
