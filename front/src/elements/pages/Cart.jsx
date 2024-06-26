import React, { useState, useEffect } from 'react'
import {Link, useLocation} from "react-router-dom";
import axios from 'axios'
import "./css/goods.css"
import noImg from "./images/no.png"
import address from '../..';

function Cart(){
    const [loading, setLoading] = useState(true);
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
            
                setLoading(false);// Отключение загрузки
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
            {page.carts && !loading ? 
                (<>
                    {page.carts.length > 0 ?
                    <div class="my-row">
                            {page.carts.map(cart => (
                                <Link to={`/product/${cart.goods.id}`} class="my-product">
                                    
                                    {cart.goods.image ? (<img src={cart.goods.image} alt="Тут должна быть картинка, но её нет"/>): 
                                        (<img src={noImg}  alt="Тут должна быть картинка, но её нет"/>)
                                    }
                                    <div class="my-str"><p class="my-title">{cart.goods.title}</p> <p class="my-des">{cart.goods.description}</p></div>
                                    <div class="my-buttons"><p class="my-title">Цена: {cart.goods.price}</p></div>
                                </Link>
                            ))}
                        
                        К оплате: {page.carts.reduce((a,item) => a = a + item.goods.price, 0)}
                        { page.isAddress ?
                            <Link to={`/payment`}><button type='button' class="my_button me-3 py-2 text-dark text-decoration-none">Оплатить</button></Link>
                            : <p>У вас нет адреса для доствки</p>
                        } 
                        
                    </div>
                    : "В козрине пусто"
                    }
                </>): 
                (
                    <>Loading...</>
                )
            }            
        </div>
    )
}

export default Cart;