import React, { useState, useEffect} from 'react'
import {useLocation} from "react-router-dom";
import axios from 'axios'
import "./css/goods.css"
import noImg from "./images/no.png"
import address from '../..';

function Product(){
    const [page, setPage] = useState([]);
    const [productId, setProductId] = useState();
    const [isCart, setIsCart] = useState(false);
    const location = useLocation();
    const url = location.pathname;
    // console.log(url);


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
          setPage(response.data)
          setProductId(response.data.product[0].id)
          setIsCart(response.data.isCart)
        })
        .catch(error => {
          console.log(error.config);
        })
      return controller.abort();
    }
    if ("/product/" == url.substring(0,9)){
    fetchData(url)};
    },["/product/" == url.substring(0,9) ? true: false]);

    const post = (data = {}) => {
      setIsCart(!isCart);
      let controller = new AbortController();
      console.log(data);
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://${address}:8080/cart`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: data
      };
      axios.request(config).then(response => {
          console.log(response.data);
          //window.location.replace("/prof")
          //console.log(response.data);
        })
        .catch(error => {
          console.log(error.config);
        })
        controller.abort()
    };
    const del = (id = {}) => {
      let controller = new AbortController();
      // console.log(id);
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://${address}:8080/delproduct?product_id=${id}`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: id
      };
      axios.request(config).then(response => {
          console.log(response.data);
          window.location.replace("/goods")
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
        {page.product ? 
          (<div>{page.product.map(product => ( 
            <div>
              <div class="pricing-header p-3 pb-md-4 mx-auto text-justify">
                <h5 class="display-4 text-center">{product.title}</h5>
                {product.img ? (<img src={product.img} alt="Тут должна быть картинка, но её нет"/>): 
                  (<img src={noImg} alt="Тут должна быть картинка, но её нет"/>)
                }
                <p class="fs-5 text-muted p-1">{product.description}</p>
              </div>
              <div class="pricing-header p-3 pb-md-4 mx-auto text-justify p-end">
                <p class="fs-5 text-muted mb-1" >Категория: {product.category.title}</p>
                <p class="fs-5 text-muted mb-1" >Цена: {product.price}</p>
                {/* {(localStorage.role == "MODER" || localStorage.role == "ADMIN") ? (<Link class="btn btn-success" to={`/update/${product.id}`}>Редактировать</Link>): null}<br/> */}
                {
                  page.access_level == 2 ? 
                  <button type='button' class="btn btn-success my-sm-3" onClick={() => del(productId)}>Удалить</button>: null
                }<br/>
                {
                  page.access_level >= 0 && !isCart ? 
                  <button type='button' class="btn btn-success my-sm-3" onClick={() => post({'product_id': productId, "add": true})}>Добавить в корзину</button>: null
                }   
                {
                  page.access_level >= 0 && isCart ? 
                  <button type='button' class="btn btn-success my-sm-3" onClick={() => post({'product_id': productId, "add": false})}>Удалить из корзины</button>: null
                }
              </div>
            </div>
            ))
            } 
          </div>): 
          (
              <>Loading...</>
          )
        }            
      </div>
    )
}

export default Product;