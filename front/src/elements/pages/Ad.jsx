import React, { useState, useEffect} from 'react'
import {Link, unstable_usePrompt, useLocation} from "react-router-dom";
import axios from 'axios'
import "./css/goods.css"
import noImg from "./images/no.png"
import address from '../..';

function Ad(){
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState([]);
  const [adId, setAdId] = useState();
  const [isMy, setIsMy] = useState(false)
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
        setAdId(response.data.ad[0].id)
        setIsMy(response.data.isMy)

        setLoading(false);// Отключение загрузки
      })
      .catch(error => {
        console.log(error.config);
      })
    return controller.abort();
  }
  if ("/ad/" == url.substring(0,4)){
  fetchData(url)};
  },["/ad/" == url.substring(0,4) ? true: false]);

  const changeActiv = (id = {}) => {
    let controller = new AbortController();
    // console.log(id);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://${address}:8080/ad/changeActive`,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      data: id
    };
    axios.request(config).then(response => {
        console.log(response.data);
        window.location.replace("/ads")
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
      {page.ad  && !loading ? 
        (<div>{page.ad.map(ad => ( 
          <div>
            <div class="pricing-header p-3 pb-md-4 mx-auto text-justify">
              <h5 class="display-4 text-center">{ad.title} 
                {!ad.active ? ("Объявление не показывается в поиске "): 
                  null
                }
              </h5>
              <div class="my_img">
                {ad.image ? (<img src={ad.image} alt="Тут должна быть картинка, но её нет"/>): 
                  (<img src={noImg} alt="Тут должна быть картинка, но её нет"/>)
                }
              </div>
              <p class="fs-5 text-muted p-1">{ad.description}</p>
            </div>
            <div class="pricing-header p-3 pb-md-4 mx-auto text-justify p-end">
              <p class="fs-5 text-muted mb-1" >Цена: {ad.price}</p>
              <p class="fs-5 text-muted mb-1" >Как со мной сзязаться: {ad.communications}</p>
              {
                (isMy || page.access_level == 2) && ad.active ? 
                <button type='button' class="my_button me-3 py-2 text-dark text-decoration-none" onClick={() => changeActiv(adId)}>Убрать из поиска</button>: null
              }<br/>
              {
                (isMy || page.access_level == 2) && !ad.active ? 
                <button type='button' class="my_button me-3 py-2 text-dark text-decoration-none" onClick={() => changeActiv(adId)}>Вернуть в поиск</button>: null
              }
              {
                isMy ? 
                <button type='button' class="my_button me-3 py-2 text-dark text-decoration-none" onClick={() => window.location.replace("/edit/ad")}>Редактировать</button>: null
              }<br/><br/>
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

export default Ad;