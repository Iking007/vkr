import React, { useState, useEffect } from 'react'
import {Link, useLocation} from "react-router-dom";
import axios from 'axios'
import "./css/goods.css"
import noImg from "./images/no.png"
import address from '../..';

function Ads(){
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState([]);
    const [numPage, setNumPage] = useState(1);
    const location = useLocation();
    const url = location.pathname;


    useEffect(() => {
    async function fetchData() {
        let controller = new AbortController();
        await axios.get(`http://${address}:8080/ads/` + numPage).then(response => {  
            console.log(response.data);
            setPage(response.data);
            setLoading(false);// Отключение загрузки
          })
          .catch(error => {
            console.log(error.config);
          })
        return controller.abort();
    }
    if ("/ads" == url){
        fetchData()};
    },[numPage, "/ads" == url ? true: false]);
    return(
        <div>
            {page.ads && !loading ? 
                (
                    <div class="my-row">
                        
                            {page.ads.map(ad => (
                                <Link to={`/ad/${ad.id}`} class="my-product">
                                    {ad.img ? (<img src={ad.img} alt="Тут должна быть картинка, но её нет"/>): 
                                        (<img src={noImg}  alt="Тут должна быть картинка, но её нет"/>)
                                    }
                                    <div class="my-str"><p class="my-title">{ad.title}</p> <p class="my-des">{ad.description}</p></div>
                                    <div class="my-buttons"><p class="my-title">Цена: {ad.price}</p></div>
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

export default Ads;