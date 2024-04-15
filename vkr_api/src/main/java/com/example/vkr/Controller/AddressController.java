package com.example.vkr.Controller;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.vkr.Model.Address;
import com.example.vkr.Model.User;
import com.example.vkr.Repository.AddressRepository;
import com.example.vkr.Repository.UserRepository;
import com.example.vkr.Requests.AddressRequest;
import com.example.vkr.Token.TokenRepository;

@RestController
public class AddressController {
    @Autowired
    AddressRepository addressRepository;
    @Autowired
    TokenRepository tokenRepository;
    @Autowired
    UserRepository userRepository;

    @PostMapping("/addaddress")
    @CrossOrigin(origins = "*")
    public void AddAddress(@RequestBody AddressRequest request, @RequestHeader(value="Authorization") String token){
        token = token.substring(7,token.length());
        User user = tokenRepository.findByToken(token).get().getUser();
        if (user.getAddress() == null) {
            Address address = Address.builder().city(request.getCity()).street(request.getStreet()).home(request.getHome()).flat(request.getFlat()).build();
            addressRepository.save(address);
            user.setAddress(address);
            userRepository.save(user);
        }
        else {
            Address address = user.getAddress();
            address.setCity(request.getCity());
            address.setStreet(request.getStreet());
            address.setHome(request.getHome());
            address.setFlat(request.getFlat());
            user.setAddress(address);
            addressRepository.save(address);
            userRepository.save(user);
        }
    }

    @GetMapping("/edit/address")
    @CrossOrigin(origins = "*")
    public String GetAddress(@RequestHeader(value="Authorization") String token) throws JSONException{
        token = token.substring(7,token.length());
        User user = tokenRepository.findByToken(token).get().getUser();
        Address address = user.getAddress();
        JSONObject json = new JSONObject();
        json.put("city", address.getCity());
        json.put("street", address.getStreet());
        json.put("home", address.getHome());
        json.put("flat", address.getFlat());
        String message = json.toString();
        System.out.println(message);
        return message;
    }
}
