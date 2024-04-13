package com.example.vkr.Requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoodsRequest {
    private String title;
    private Long category_id;
    private String img;
    private String str;
    private double price;
}
