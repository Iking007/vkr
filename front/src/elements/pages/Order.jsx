import React, { useState, useEffect } from 'react'
import {Link, useLocation} from "react-router-dom";
import axios from 'axios'
import noImg from "./images/no.png"
import address from '../..';

function Order(){
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState([]);
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
                setOrderId(response.data[0].id);
        
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
          },
          data: id
        };
        axios.request(config).then(response => {
            console.log(response.data);
            window.location.replace("/orders")
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
            {page.goods && !loading ? 
                (
                    <div class="my-row">
                        
                            {page.goods.map(product => (
                                <Link to={`/product/${product.id}`} class="my-product">
                                    {product.img ? (<img src={product.img} alt="Тут должна быть картинка, но её нет"/>): 
                                        (<img src={noImg}  alt="Тут должна быть картинка, но её нет"/>)
                                    }
                                    <div class="my-str"><p class="my-title">{product.title}</p> <p class="my-des">{product.description}</p></div>
                                    <div class="my-buttons"><p class="my-title">Цена: {product.price}</p></div>
                                </Link>
                            ))}
                        {
                            page.access_level == 2 ? 
                            <button type='button' class="btn btn-success my-sm-3" onClick={() => changeProcessed(adOrder)}>Переместить в обработанные</button>: null
                        }<br/>
                        {
                            page.access_level == 2 ? 
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