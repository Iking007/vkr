import React, { useState, useEffect } from 'react'
import {Link, useLocation} from "react-router-dom";
import axios from 'axios'
import "./css/category.css"
import address from '../..';

function Category(){
    const [loading, setLoading] = useState(true);  
    const [page, setPage] = useState([]);
    const location = useLocation();
    const url = location.pathname;


    useEffect(() => {
    let controller = new AbortController();
    let config = {
      method: 'get',
        maxBodyLength: Infinity,
        url: `http://${address}:8080/categories`,
        headers: { 
          'Content-Type': 'application/json'
        }
    }
    if (localStorage.token != null) {config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`};
    async function fetchData() {
      
      axios.request(config).then(response => {
          console.log(response.data);
          setPage(response.data);

          setLoading(false);// Отключение загрузки
        })
        .catch(error => {
          console.log(error.config);
        })
    }
    if ("/categories" == url) {
    fetchData()};
    return () => controller.abort
    },["/categories" == url ? true: false]);
    
    return(
        <div>
        {page.categories && !loading ? 
          (
            <div>
              <div class="my-category">
                {page.categories.map(category => (
                  <div>
                  <Link to={`/goods/query/1?category=${category.id}&page=1`}>
                      <h3>{category.title}</h3>
                  </Link>
                  {page.access_level == 2  ? <div>❌</div>: null}
                </div>
                ))}
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

export default Category;