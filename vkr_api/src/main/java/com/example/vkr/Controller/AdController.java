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
import org.springframework.web.bind.annotation.RestController;

import com.example.vkr.Model.Ad;
import com.example.vkr.Model.User;
import com.example.vkr.Repository.AdRepository;
import com.example.vkr.Repository.UserRepository;
import com.example.vkr.Requests.AdRequest;
import com.example.vkr.Requests.QueryRequest;
import com.example.vkr.Token.TokenRepository;

@RestController
public class AdController {
    short elInPage = 10;
    @Autowired
    AdRepository adRepository;
    @Autowired
    TokenRepository tokenRepository;
    @Autowired
    UserRepository userRepository;

    @PostMapping("/addad")
    @CrossOrigin(origins = "*")
    public void addad(@RequestBody AdRequest request, @RequestHeader("Authorization") String token){
        token = token.substring(7,token.length());
        User user = tokenRepository.findByToken(token).get().getUser();
        if (user.getAd()== null){
            Ad ad = Ad.builder()
                .title(request.getTitle())
                .image(request.getImg())
                .active(true)
                .description(request.getStr())
                .price(request.getPrice())
                .communications(request.getCommunications()).build();
            adRepository.save(ad);
            user.setAd(ad);
            userRepository.save(user);
        }
        else {
            Ad ad = user.getAd();
            ad.setTitle(request.getTitle());
            ad.setImage(request.getImg());
            ad.setDescription(request.getStr());
            ad.setPrice(request.getPrice());
            ad.setCommunications(request.getCommunications());
            adRepository.save(ad);
            user.setAd(ad);
            userRepository.save(user);
        }
        return;
    }

    @GetMapping("/ads/{page}")
    @CrossOrigin(origins = "*")
    public String pageId(@PathVariable(value = "page") int page, @RequestHeader(value="Authorization", required=false) String token) throws JSONException{
        List<Ad> ads = adRepository.findAllByActive(true);
        String message;
        JSONObject json = new JSONObject();
        json.put("page", page);
        json.put("maxPage", ((ads.size()%elInPage == 0 )? ads.size()/elInPage : ads.size()/elInPage + 1));
        json.put("ads", Arrays.copyOfRange(ads.toArray(), elInPage*page-elInPage, ((ads.size() <= elInPage*page) ? ads.size() : elInPage*page)));
        message = json.toString();
        //System.out.println(message);
        return message;
    }

    @GetMapping("/ad/{id}")
    @CrossOrigin(origins = "*")
    public String ad(@PathVariable(value = "id") Long ad_id, @RequestHeader(value="Authorization", required=false) String token) throws JSONException{
        String message;
        JSONObject json = new JSONObject();
        Ad ad = adRepository.findById(ad_id).get();
        List<Ad> ads = new ArrayList<>();
        ads.add(ad);
        json.put("ad", ads.toArray());
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
            boolean isMy = user.getAd() == ad;
            json.put("isMy", isMy);
        }
        //System.out.println(json);
        message = json.toString();
        return message;
    }

    @GetMapping("/edit/ad")
    @CrossOrigin(origins = "*")
    public String GetAddress(@RequestHeader(value="Authorization") String token) throws JSONException{
        token = token.substring(7,token.length());
        User user = tokenRepository.findByToken(token).get().getUser();
        Ad ad = user.getAd();
        JSONObject json = new JSONObject();
        json.put("image", ad.getImage());
        json.put("title", ad.getTitle());
        json.put("str", ad.getDescription());
        json.put("price", ad.getPrice());
        json.put("communications", ad.getCommunications());
        String message = json.toString();
        //System.out.println(message);
        return message;
    }

    @PostMapping("/ad/changeActive")
    @CrossOrigin(origins = "*")
    public void ChangeActive(@RequestHeader(value="Authorization") String token){
        token = token.substring(7,token.length());
        Ad ad = tokenRepository.findByToken(token).get().getUser().getAd();
        ad.setActive(!ad.getActive());
        adRepository.save(ad);
        return;
    }

    @PostMapping("/ads/query/{page}")
    @CrossOrigin(origins = "*")
    public String AdsQuery(@PathVariable(value = "page") int page, @RequestHeader(value="Authorization", required=false) String token, @RequestBody QueryRequest request) throws JSONException{
        List<Ad> ads = new ArrayList<Ad>();
        System.out.println(request.getTitle());
        if(request.getTitle() != null){
            ads.addAll(adRepository.searchByTitleAndActive(request.getTitle(),true));
        }
        else{
            ads.addAll(adRepository.findAllByActive(true));
        }
        JSONObject json = new JSONObject();
        json.put("page", page);
        json.put("maxPage", ((ads.size()%elInPage == 0 )? ads.size()/elInPage : ads.size()/elInPage + 1));
        json.put("ads", Arrays.copyOfRange(ads.toArray(), elInPage*page-elInPage, ((ads.size() <= elInPage*page) ? ads.size() : elInPage*page)));
        String message = json.toString();
        //System.out.println(message);
        return message;
    }
}
