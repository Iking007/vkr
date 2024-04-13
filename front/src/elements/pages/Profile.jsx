import React, { useState, useEffect } from 'react'
import {Link,useLocation} from "react-router-dom";
import axios from "axios";
import "../blooks/header.css";
import address from '../..';

function Profile(){
    const [page, setPage] = useState(false);
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
            //console.log(response.data);
            localStorage.role = response.data.role;
            setPage(response.data);
            //window.location.replace("/")
            //console.log(response.data);
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
            {page.name ? 
              (
                <div>
                    <h2>{page.name}</h2>
                    <h3>Ваша роль: {page.role}</h3>
                    {page.role == "ADMIN" || page.role == "MODER" ? 
                      (<>
                        <Link to="/add/category" class="my_button">Добавить Категорию</Link>
                        <Link to="/add/product" class="my_button">Добавить Товар</Link>
                      </>): 
                      null
                    }
                    {page.role == "ADMIN" ? 
                      (<>
                        <Link to="/users" class="my_button">Все пользователи</Link>
                      </>): 
                      null
                    }
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