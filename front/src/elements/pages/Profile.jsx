import React, { useState, useEffect } from 'react'
import {Link,useLocation} from "react-router-dom";
import axios from "axios";
import "../blooks/header.css";
import "./css/profile.css"
import address from '../..';

function Profile(){
    const [page, setPage] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const url = location.pathname;
    //const params = new URLSearchParams(location.search);

    useEffect(() => {
      let controller = new AbortController();
        //console.log(localStorage.getItem('token'))
        async function postRequest(){
          let config = {
            headers: { 
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          };
          axios.get(`http://${address}:8080/prof`,config).then(response => {
            localStorage.role = response.data.role;
            setPage(response.data);

            setLoading(false);// Отключение загрузки
          })
          .catch(error => {
            console.log(error.config);
          })
          
        };
        if ("/prof" == location.pathname){postRequest()};
        return controller.abort();
      },["/prof" == url ? true: false]);

    const exit = () => { window.location.replace("/"); localStorage.clear();}
    return(
        <div>
          {page.user && !loading ? 
            (<div class="d-flex profile">
              <div>
              <h2>{page.user.name}</h2>
              <h2>{page.user.surname}</h2>
                <h3>Ваша роль: {page.user.role}</h3>
              </div>
              <ul class="buttons_profile">
                {page.access_level > 0 ? 
                  (<>
                    <li><Link to="/add/category" class="text-dark text-decoration-none link_profile">Добавить Категорию</Link></li>
                    <li><Link to="/add/product" class="text-dark text-decoration-none link_profile">Добавить Товар</Link></li>
                  </>): 
                  null
                }
                {page.access_level == 2 ? 
                  (<>
                    <li><Link to="/users" class="text-dark text-decoration-none link_profile">Все пользователи</Link></li>
                  </>): 
                  null
                }
                {page.user.ad == null? 
                  (
                    <li><Link to="/add/ad" class="text-dark text-decoration-none link_profile">Создать объявление</Link></li>
                  ): 
                  (
                    <li><Link to={`/ad/`+ page.user.ad} class="text-dark text-decoration-none link_profile">Моё объявление</Link></li>
                  )
                }
                {page.user.address == null? 
                  (
                    <li><Link to="/add/address" class="text-dark text-decoration-none link_profile">Добавить адрес</Link></li>
                  ): 
                  (
                    <li><Link to={`/edit/address`} class="text-dark text-decoration-none link_profile">Редактировать адрес</Link></li>
                  )
                }
                <li><Link to="/myorders" class="text-dark text-decoration-none link_profile">Заказы</Link></li>
                {page.access_level == 2 ? 
                  (<>
                    <li><Link to="/orders" class="text-dark text-decoration-none link_profile">Заказы пользователей</Link></li>
                  </>): 
                  null
                }
              </ul>
              
            </div>
            ): 
            (
                <>Loading...</>
            )
          }        
          <button onClick={exit}>Выйти из аккаунта</button>
        </div>
    )
}

export default Profile;