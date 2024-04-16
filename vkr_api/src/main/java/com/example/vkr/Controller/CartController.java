package com.example.vkr.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.vkr.Model.Cart;
import com.example.vkr.Model.Product_order;
import com.example.vkr.Model.Orders;
import com.example.vkr.Model.User;
import com.example.vkr.Repository.CartRepository;
import com.example.vkr.Repository.GoodsRepository;
import com.example.vkr.Repository.Goods_orderRepository;
import com.example.vkr.Repository.OrdersRepository;
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
    @Autowired
    OrdersRepository ordersRepository;
    @Autowired
    Goods_orderRepository goods_orderRepository;

    @PostMapping("/cart")
    public void NewOrDelCart(@RequestBody CartRequest request, @RequestHeader("Authorization") String token){
        token = token.substring(7,token.length());
        User user = tokenRepository.findByToken(token).get().getUser();
        if(request.isAdd()){
            Cart cart = Cart.builder()
                .goods(goodsRepository.findById(request.getProduct_id()).get())
                .quantity(1)
                .build();
            cartRepository.save(cart);
            user.getCarts().add(cart);
            userRepository.save(user);

        }
        else{
            Cart cart = user.getCarts().stream()
            .filter(obj -> obj.getGoods().getId().equals(request.getProduct_id())).findFirst().orElse(null);
            cart = cartRepository.findById(cart.getId()).get();
            user.getCarts().remove(cart);
            userRepository.save(user);
            cartRepository.delete(cart);
        }
    }
    
    @GetMapping("/mycart")
    public String MyCart(@RequestHeader("Authorization") String token) throws JSONException{
        token = token.substring(7,token.length());
        User user = tokenRepository.findByToken(token).get().getUser();
        List<Cart> carts = user.getCarts();
        String message = "";
        JSONObject json = new JSONObject();
        json.put("carts", carts.toArray());

        if(user.getAddress() == null) json.put("isAddress", false); // проверка на наличие адреса
        else json.put("isAddress", true);

        message = json.toString();
        //System.out.println(message);
        return message;
    }
    
    @PostMapping("/payment")
    public String Payment(@RequestHeader("Authorization") String token) throws JSONException{
        token = token.substring(7,token.length());
        User user = tokenRepository.findByToken(token).get().getUser();
        if(user.getAddress() == null) return "";
        Orders order = Orders.builder()
            .goods_orders(new ArrayList<>())
            .price(0)
            .processed(false)
            .address(user.getAddress().getCity() + " " + user.getAddress().getStreet() + " " + user.getAddress().getHome() + " " + user.getAddress().getFlat())
            .build();
        
        user.getCarts().forEach((cart) -> {
            Product_order goods_order = Product_order.builder()
            .product(cart.getGoods())
            .price(cart.getGoods().getPrice())
            .quantity(cart.getQuantity()).build();
            order.getGoods_orders().add(goods_order);
            System.out.print(order.getGoods_orders().toString());
            goods_orderRepository.save(goods_order);

        });
        double price = order.getGoods_orders().stream().filter(Objects::nonNull).mapToDouble(o -> o.getPrice()).sum();
        JSONObject json = new JSONObject();
        order.setPrice(price);
        ordersRepository.save(order);
        user.getOrders().add(order);
        List<Cart> carts = new ArrayList<>();
        carts = user.getCarts();
        user.getCarts().clear();
        cartRepository.deleteAll(carts);
        userRepository.save(user);
        json.put("order_id", order.getId());
        String message = json.toString();
        //System.out.println(message);
        return message;
    }
}
