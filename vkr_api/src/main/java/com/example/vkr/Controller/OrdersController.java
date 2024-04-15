package com.example.vkr.Controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.vkr.Model.Orders;
import com.example.vkr.Model.User;
import com.example.vkr.Repository.OrdersRepository;
import com.example.vkr.Token.TokenRepository;

@RestController
public class OrdersController {
    short elInPage = 15;
    @Autowired
    OrdersRepository ordersRepository;
    @Autowired
    TokenRepository tokenRepository;

    @GetMapping("/order/{id}")
    @CrossOrigin(origins = "*")
    public String Order(@PathVariable(value = "id") Long order_id, @RequestHeader(value="Authorization", required=false) String token) throws JSONException{
        JSONObject json = new JSONObject();
        Orders order = ordersRepository.findById(order_id).get();
        List<Orders> orders = new ArrayList<>();
        orders.add(order);
        json.put("order", orders.toArray());
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
            boolean isMy = user.getOrders().stream()
                .anyMatch(obj -> obj.equals(order));
            json.put("isMy", isMy);
        }
        //System.out.println(json);
        String message = json.toString();
        return message;

    }
    
    @PostMapping("/order/changeProcessed")
    @CrossOrigin(origins = "*")
    public void ChangeProcessed(@RequestParam Long product_id, @RequestHeader(value="Authorization") String token){
        Orders order = ordersRepository.findById(product_id).get();
        order.setProcessed(!order.isProcessed());
        ordersRepository.save(order);
    }

    @GetMapping("/myorders/{page}")
    @CrossOrigin(origins = "*")
    public String MyOrders(@PathVariable(value = "page") Long page, @RequestHeader("Authorization") String token) throws JSONException{
        token = token.substring(7,token.length());
        User user = tokenRepository.findByToken(token).get().getUser();
        List<Orders> orders = user.getOrders();
        
        JSONObject json = new JSONObject();
        json.put("page", page);
        int startIndex = (int) (elInPage * page - elInPage);
        int endIndex = Math.min((int) (elInPage * page), orders.size()); // Учитываем, что последняя страница может иметь меньше элементов
        json.put("maxPage", ((orders.size()%elInPage == 0 )? orders.size()/elInPage : orders.size()/elInPage + 1));
        json.put("orders", orders.subList(startIndex, endIndex).toArray());
        String message = json.toString();
        //System.out.println(message);
        return message;
    }

    @GetMapping("/orders/{page}")
    @CrossOrigin(origins = "*")
    public String Orders(@PathVariable(value = "page") Long page, @RequestHeader("Authorization") String token) throws JSONException{
        List<Orders> orders = ordersRepository.findAll();
        JSONObject json = new JSONObject();
        json.put("page", page);
        int startIndex = (int) (elInPage * page - elInPage);
        int endIndex = Math.min((int) (elInPage * page), orders.size()); // Учитываем, что последняя страница может иметь меньше элементов
        json.put("maxPage", ((orders.size()%elInPage == 0 )? orders.size()/elInPage : orders.size()/elInPage + 1));
        json.put("orders", orders.subList(startIndex, endIndex).toArray());
        String message = json.toString();
        //System.out.println(message);
        return message;
    }

    @GetMapping("/orders/processed/{page}")
    @CrossOrigin(origins = "*")
    public String OrdersProcessed(@PathVariable(value = "page") Long page, @RequestHeader("Authorization") String token) throws JSONException{
        List<Orders> orders = ordersRepository.findAllByProcessed(true);
        JSONObject json = new JSONObject();
        json.put("page", page);
        int startIndex = (int) (elInPage * page - elInPage);
        int endIndex = Math.min((int) (elInPage * page), orders.size()); // Учитываем, что последняя страница может иметь меньше элементов
        json.put("maxPage", ((orders.size()%elInPage == 0 )? orders.size()/elInPage : orders.size()/elInPage + 1));
        json.put("orders", orders.subList(startIndex, endIndex).toArray());
        String message = json.toString();
        //System.out.println(message);
        return message;
    }

    @GetMapping("/orders/unprocessed/{page}")
    @CrossOrigin(origins = "*")
    public String OrdersUnprocessed(@PathVariable(value = "page") Long page, @RequestHeader("Authorization") String token) throws JSONException{
        List<Orders> orders = ordersRepository.findAllByProcessed(false);
        JSONObject json = new JSONObject();
        json.put("page", page);
        int startIndex = (int) (elInPage * page - elInPage);
        int endIndex = Math.min((int) (elInPage * page), orders.size()); // Учитываем, что последняя страница может иметь меньше элементов
        json.put("maxPage", ((orders.size()%elInPage == 0 )? orders.size()/elInPage : orders.size()/elInPage + 1));
        json.put("orders", orders.subList(startIndex, endIndex).toArray());
        String message = json.toString();
        //System.out.println(message);
        return message;
    }
}

