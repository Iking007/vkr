import React, { useState, useEffect} from 'react'
import {unstable_usePrompt, useLocation} from "react-router-dom";
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
      url: `http://${address}:8080/ad/changeActiv?ad_id=${id}`,
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
              {ad.img ? (<img src={ad.img} alt="Тут должна быть картинка, но её нет"/>): 
                (<img src={noImg} alt="Тут должна быть картинка, но её нет"/>)
              }
              <p class="fs-5 text-muted p-1">{ad.description}</p>
            </div>
            <div class="pricing-header p-3 pb-md-4 mx-auto text-justify p-end">
              <p class="fs-5 text-muted mb-1" >Цена: {ad.price}</p>
              {/* {(localStorage.role == "MODER" || localStorage.role == "ADMIN") ? (<Link class="btn btn-success" to={`/update/${ad.id}`}>Редактировать</Link>): null}<br/> */}
              {
                (isMy || page.access_level == 2) && ad.active ? 
                <button type='button' class="btn btn-success my-sm-3" onClick={() => changeActiv(adId)}>Удалить</button>: null
              }<br/>
              {
                (isMy || page.access_level == 2) && !ad.active ? 
                <button type='button' class="btn btn-success my-sm-3" onClick={() => changeActiv(adId)}>Вернуть в поиск</button>: null
              }<br/>
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