import React, { useState, useEffect } from 'react'
import {Link, useLocation} from "react-router-dom";
import axios from 'axios'
import "./css/goods.css"
import noImg from "./images/no.png"
import address from '../..';

function Goods(){
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState([]);
    const [numPage, setNumPage] = useState(1);
    const location = useLocation();
    const url = location.pathname;


    useEffect(() => {
    async function fetchData() {
        let controller = new AbortController();
        await axios.get(`http://${address}:8080/goods/` + numPage).then(response => {   
            setPage(response.data);

            setLoading(false);// Отключение загрузки
          })
          .catch(error => {
            console.log(error.config);
          })
        return controller.abort();
    }
    if ("/goods" == url){
        fetchData()};
        setLoading(false);
    },[numPage, "/goods" == url ? true: false]);
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

export default Goods;