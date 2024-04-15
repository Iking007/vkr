import React, { useState, useEffect } from 'react'
import {Link, useLocation} from "react-router-dom";
import "./css/index.css"
import qr from "./images/qr.png"
import axios from "axios";
import address from '../..';


function Payment(){
  const [price, setPrice] = useState(0);
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
            'Content-Type': 'application/json'
          }
        };
        if (localStorage.token != null) {config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`};
        axios.request(config).then(response => {
            console.log(response.data);
            setPrice(response.data.carts.reduce((a,item) => a = a + item.goods.price, 0))
          })
          .catch(error => {
            console.log(error.config);
          })
       
        return controller.abort();
      }
  if ("/payment" == url){
      fetchData()};
  },["/payment" == url ? true: false]);

  const post = () => {
      let controller = new AbortController();
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://${address}:8080/payment`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      };
      axios.request(config).then(response => {
        window.window.location.href = "/order/"+response.data.order_id
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.config);
      })
      controller.abort()
    };
  
  return(
      <div class="center">
          <img src={qr} class="gr"></img>
          <div>К оплате: {price}<button type='button' class="my_button  text-dark text-decoration-none" onClick={() => post()}>Проверить оплату</button></div>
      </div>
  )
}

export default Payment;