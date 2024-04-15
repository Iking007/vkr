import React, { useState, useEffect } from 'react'
import {Link, useLocation} from "react-router-dom";
import axios from 'axios'
import noImg from "./images/no.png"
import address from '../..';

function Order(){
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState([]);
    const [processed, setProcessed] = useState(false);
    const [adOrder, setOrderId] = useState();
    const location = useLocation();
    const url = location.pathname;


    
    useEffect(() => {
        async function fetchData(url) {
            let controller = new AbortController();
            let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://${address}:8080`+url,
            headers: { 
                'Content-Type': 'application/json',
            }
            };
            if (localStorage.token != null) {config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`};
            axios.request(config).then(response => {
                console.log(response.data);
                setPage(response.data);
                setOrderId(response.data.order[0].id);
                setProcessed(response.data.order[0].processed);
        
                setLoading(false);// Отключение загрузки
            })
            .catch(error => {
                console.log(error.config);
            })
            return controller.abort();
        }
        if ("/order/" == url.substring(0,7)){
        fetchData(url)};
    },["/order/" == url.substring(0,7) ? true: false]);

    const changeProcessed = (id = {}) => {
        let controller = new AbortController();
        // console.log(id);
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `http://${address}:8080/order/changeProcessed?product_id=${id}`,
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        };
        axios.request(config).then(response => {
            console.log(response.data);
            setProcessed(!processed);
            //console.log(response.data);
          })
          .catch(error => {
            console.log(error.config);
          })
          controller.abort();
          return;
      };

    return(
        <div>
            {page.order && !loading ? 
                (
                    <div class="my-row">
                        
                        {page.order[0].goods_orders.map(goods_order => (
                            <Link to={`/product/${goods_order.product.id}`} class="my-product">
                                {goods_order.product.image ? (<img src={goods_order.product.image} alt="Тут должна быть картинка, но её нет"/>): 
                                    (<img src={noImg}  alt="Тут должна быть картинка, но её нет"/>)
                                }
                                <div class="my-str"><p class="my-title">{goods_order.product.title}</p> <p class="my-des">{goods_order.product.description}</p></div>
                                <div class="my-buttons"><p class="my-title">Нынешняя цена: {goods_order.product.price}</p></div>
                            </Link>
                        ))}
                        <div>
                            <p>Адрес доставки заказа: {page.order[0].address}</p>
                            <p>На заказ было потрачено: {page.order[0].price}</p>
                            <p>{ processed ? "Обработан" : "На обработке"}</p>
                        </div>
                        {
                            page.access_level == 2 && !processed? 
                            <button type='button' class="btn btn-success my-sm-3" onClick={() => changeProcessed(adOrder)}>Переместить в обработанные</button>: null
                        }<br/>
                        {
                            page.access_level == 2 && processed ? 
                            <button type='button' class="btn btn-success my-sm-3" onClick={() => changeProcessed(adOrder)}>Вернуть в обработку</button>: null
                        }
                    </div>
                ): 
                (
                    <>Loading...</>
                )
            }            
        </div>
    )
}

export default Order;