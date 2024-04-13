import React, { useState, useEffect } from 'react'
import {Link, useLocation} from "react-router-dom";
import axios from 'axios'
import "./css/goods.css"
import noImg from "./images/no.png"
import address from '../..';

function Cart(){
    const [page, setPage] = useState([]);
    const location = useLocation();
    const url = location.pathname;


    useEffect(() => {
        async function fetchData() {
            let controller = new AbortController();
            let config = {
              method: 'get',
              maxBodyLength: Infinity,
              url: `http://${address}:8080/mycart`,
              headers: { 
                'Content-Type': 'application/json',
              }
            };
            if (localStorage.token != null) {config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`};
            axios.request(config).then(response => {
                console.log(response.data);
                setPage(response.data)
              })
              .catch(error => {
                console.log(error.config);
              })
            return controller.abort();
          }
    if ("/mycart" == url){
        fetchData()};
    },["/mycart" == url ? true: false]);
    return(
        <div>
            {page.carts ? 
                (
                    <div class="my-row">
                            {page.carts.goodsId.map(product => (
                                <Link to={`/product/${product.id}`} class="my-product">
                                    {product.img ? (<img src={product.img} alt="Тут должна быть картинка, но её нет"/>): 
                                        (<img src={noImg}  alt="Тут должна быть картинка, но её нет"/>)
                                    }
                                    <div class="my-str"><p class="my-title">{product.title}</p> <p class="my-des">{product.description}</p></div>
                                    <div class="my-buttons"></div>
                                </Link>
                            ))}
                    </div>
                ): 
                (
                    <>Loading...</>
                )
            }            
        </div>
    )
}

export default Cart;