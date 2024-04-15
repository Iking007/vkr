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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.vkr.Model.Goods;
import com.example.vkr.Model.User;
import com.example.vkr.Repository.CartRepository;
import com.example.vkr.Repository.CategoryRepository;
import com.example.vkr.Repository.GoodsRepository;
import com.example.vkr.Requests.GoodsRequest;
import com.example.vkr.Requests.QueryRequest;
import com.example.vkr.Token.TokenRepository;

@RestController
public class GoodsController {
    short elInPage = 10;

    @Autowired
    GoodsRepository goodsRepository;
    @Autowired 
    CategoryRepository categoryRepository;
    @Autowired
    TokenRepository tokenRepository;
    @Autowired
    CartRepository cartRepository;

    @GetMapping("/goods/{page}")
    @CrossOrigin(origins = "*")
    public String pageId(@PathVariable(value = "page") int page, @RequestHeader(value="Authorization", required=false) String token) throws JSONException{
        List<Goods> goods = goodsRepository.findAllByActive(true);
        String message;
        JSONObject json = new JSONObject();
        json.put("page", page);
        json.put("maxPage", ((goods.size()%elInPage == 0 )? goods.size()/elInPage : goods.size()/elInPage + 1));
        json.put("goods", Arrays.copyOfRange(goods.toArray(), elInPage*page-elInPage, ((goods.size() <= elInPage*page) ? goods.size() : elInPage*page)));
        message = json.toString();
        //System.out.println(message);
        return message;
    }
    
    @PostMapping("/add/product")
    @CrossOrigin(origins = "*")
    public void addProduct(@RequestBody GoodsRequest request){
        if (request.getId() == null){
            Goods product = Goods.builder()
                .title(request.getTitle())
                .category(categoryRepository.findById(request.getCategory_id()).get())
                .image(request.getImg())
                .active(true)
                .description(request.getStr())
                .price(request.getPrice()).build();
            goodsRepository.save(product);
        }
        else {
            Goods product = goodsRepository.findById(request.getId()).get();
            product.setTitle(request.getTitle());
            product.setCategory(categoryRepository.findById(request.getCategory_id()).get());
            product.setImage(request.getImg());
            product.setDescription(request.getStr());
            product.setPrice(request.getPrice());
            goodsRepository.save(product);
        }
        return;
    }

    @PostMapping("/goods/changeActive")
    @CrossOrigin(origins = "*")
    public void ChangeActive(@RequestParam Long product_id, @RequestHeader(value="Authorization") String token){
        token = token.substring(7,token.length());
        String [] roles = {"MODER", "ADMIN"};
        if(Arrays.asList(roles).contains(tokenRepository.findByToken(token).get().getUser().getRole().name())){ // Проверка роли пользователя
            Goods product = goodsRepository.findById(product_id).get();
            product.setActive(!product.getActive());
            goodsRepository.save(product);
        }
        return;
    }

    @GetMapping("/product/{id}")
    @CrossOrigin(origins = "*")
    public String product(@PathVariable(value = "id") Long product_id, @RequestHeader(value="Authorization", required=false) String token) throws JSONException{
        String message;
        JSONObject json = new JSONObject();
        Goods product = goodsRepository.findById(product_id).get();
        List<Goods> goods = new ArrayList<>();
        goods.add(product);
        json.put("product", goods.toArray());
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
            boolean isCart = user.getCarts().stream()
                .anyMatch(obj -> obj.getGoods().equals(product));
            json.put("isCart", isCart);
        }
        //System.out.println(json);
        message = json.toString();
        return message;
    }

    @PostMapping("/goods/query/{page}")
    @CrossOrigin(origins = "*")
    public String Query(@PathVariable(value = "page") int page, @RequestHeader(value="Authorization", required=false) String token, @RequestBody QueryRequest request) throws JSONException{
        List<Goods> goods = new ArrayList<Goods>();
        System.out.println(request.getTitle());
        if(request.getCategoryId() != null){
            goods = goodsRepository.searchByCategoryAndActive(categoryRepository.findById(request.getCategoryId()).get(),true);
        }
        if(request.getTitle() != null){
            goods.addAll(goodsRepository.searchByTitleAndActive(request.getTitle(),true));
        }
        String message;
        JSONObject json = new JSONObject();
        json.put("page", page);
        json.put("maxPage", ((goods.size()%elInPage == 0 )? goods.size()/elInPage : goods.size()/elInPage + 1));
        json.put("goods", Arrays.copyOfRange(goods.toArray(), elInPage*page-elInPage, ((goods.size() <= elInPage*page) ? goods.size() : elInPage*page)));
        message = json.toString();
        //System.out.println(message);
        return message;
    }

    @GetMapping("/edit/product/{id}")
    @CrossOrigin(origins = "*")
    public String GetProduct(@PathVariable(value = "id") Long product_id, @RequestHeader(value="Authorization") String token) throws JSONException{
        Goods product = goodsRepository.findById(product_id).get();
        JSONObject json = new JSONObject();
        json.put("id", product.getId());
        json.put("title", product.getTitle());
        json.put("category", product.getCategory().getId());
        json.put("image", product.getImage());
        json.put("str", product.getDescription());
        json.put("price", product.getPrice());
        json.put("categoryTitle", product.getCategory().getTitle());
        String message = json.toString();
        //System.out.println(message);
        return message;
    }
}
