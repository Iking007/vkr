import React, { useState, useEffect} from 'react'
import {Link, useLocation} from "react-router-dom";
import axios from 'axios'
import noImg from "./images/no.png"
import "./css/goods.css"
import address from '../..';

function Query(){
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState([]);
    const [numPage, setNumPage] = useState(1);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const title = params.get('title');
    const categoryId = params.get('category');
    

    useEffect(() => {
    async function fetchData() {
        let controller = new AbortController();
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://${address}:8080/goods/query/${numPage}`,
            headers: { 
            'Content-Type': 'application/json',
            },
            data: {}
        };
        if (title != null) {config.data["title"] = title};
        if (categoryId != null) {config.data["categoryId"] = categoryId};
        if (localStorage.token != null) {config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`};
            //console.log(`http://${address}:8080/goods/query/${numPage}`);
            console.log(config.data)
            axios.request(config).then(response => {
                console.log(response.data) // значение параметра "myQueryParam" из URL
                setPage(response.data);
                
                setLoading(false);// Отключение загрузки
            })
            .catch(error => {
                console.log(error.config);
            
            })
        return controller.abort();
    }
        if ("/goods/query" == location.pathname.substring(0,12)){
        fetchData()};
    },["/goods/query" == location.pathname.substring(0,12) ? true: false]);
  
    
    return(
        <div>
            {page.goods && !loading ? 
                (
                    <div class="my-row">
                        {page.goods.map(product => (
                            <Link to={`/product/${product.id}`} class="my-product">
                                <div class="my_img">
                                    {product.image ? (<img src={product.image} alt="Тут должна быть картинка, но её нет"/>): 
                                        (<img src={noImg}  alt="Тут должна быть картинка, но её нет"/>)
                                    }
                                </div>
                                <div class="my-str">
                                    <p class="my-title">{product.title}</p> 
                                    <p>Категория:{product.category.title}</p>
                                    <p class="my-des">{product.description}</p>
                                </div>
                                <div class="my-buttons"></div>
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
export default Query;