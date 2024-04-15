import React, { useState, useEffect } from 'react'
import {Link, useLocation} from "react-router-dom";
import axios from 'axios'
import "./css/orders.css"
import address from '../..';

function Orders(){
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState([]);
    const [numPage, setNumPage] = useState(1);
    const location = useLocation();
    const url = location.pathname;


    useEffect(() => {
    async function fetchData() {
        let controller = new AbortController();
        // console.log(id);
        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://${address}:8080/orders/${numPage}`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        };
        axios.request(config).then(response => {    
        console.log(response.data);
        setPage(response.data)

        //console.log(response.data);
        })
        .catch(error => {
            console.log(error.config);
        })
        controller.abort();
        return;
    }
    async function ordersProcessed() {
        let controller = new AbortController();
        // console.log(id);
        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://${address}:8080/orders/processed/${numPage}`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        };
        axios.request(config).then(response => {    
        console.log(response.data);
        setPage(response.data)

        //console.log(response.data);
        })
        .catch(error => {
            console.log(error.config);
        })
        controller.abort();
        return;
    }
    async function ordersUnprocessed() {
        let controller = new AbortController();
        // console.log(id);
        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://${address}:8080/orders/unprocessed/${numPage}`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        };
        axios.request(config).then(response => {    
        console.log(response.data);
        setPage(response.data)

        //console.log(response.data);
        })
        .catch(error => {
            console.log(error.config);
        })
        controller.abort();
        return;
    }
    if ("/orders" == url){
        fetchData()};
    if("/orders/processed" == url){ordersProcessed()}
    if("/orders/unprocessed" == url){ordersUnprocessed()}
        setLoading(false);
    },[numPage,url, "/orders" == url.substring(0,7) ? true: false]);
    return(
        <div>
            {page.orders && !loading ? 
                (
                    <div class="my-row">
                        <div class="my-flex">
                            <Link to="/orders" class="m-3 text-dark text-decoration-none link_profile">Все заказы</Link>
                            <Link to="/orders/unprocessed" class="m-3 text-dark text-decoration-none link_profile">Не обработанные</Link>
                            <Link to="/orders/processed" class="m-3 text-dark text-decoration-none link_profile">Обработанные</Link>
                        </div>
                            {page.orders.map(order => (
                                <Link to={`/order/${order.id}`} class="my-order">
                                    <div><p class="my-srt">Номер заказа: {order.id}</p></div>
                                    <div><p class="my-srt">Цена: {order.price}</p></div>
                                    <div><p class="my-srt">{order.processed ? "Обработан" : "В обработке"}</p></div>
                                </Link>
                            ))}
                        
                        <div class="my-numPage">
                            {numPage > 1 ?
                                (<a href="#head"><button onClick={() => setNumPage(numPage - 1)}>←</button></a>):
                                (null)
                            }  
                            {page.page} 
                            {page.maxPage == page.page ? (null): (<>...{page.maxPage}<a href="#head"><button onClick={() => setNumPage(numPage + 1)}>→</button></a></>)
                            }
                        </div>
                    </div>
                ): 
                (
                    <>Loading...</>
                )
            }            
        </div>
    )
}

export default Orders;