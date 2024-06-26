import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import "./css/goods.css"
import "./css/addProduct.css"
import address from '../..';

function AddCategory(){
    const [title, setTitle] = useState();
    const [str, setStr] = useState();
    
    const post = (data = {}) => {
        if (title == null || str == null) return;
        console.log(data);
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `http://${address}:8080/add/category`,
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          data: data
        };
        axios.request(config).then(response => {
            //console.log(response.data);
            window.location.href = "/prof"
            //console.log(response.data);
          })
          .catch(error => {
            console.log(error.config);
          })
      };
    return(
        <div>
            <form class="my-form">
            <p>Добавление Категории</p>
                <input type="text" required
                    name="title" placeholder="Введите Название"
                    class="form-control" value={title} onInput={e => setTitle(e.target.value)} autocomplete="off"/><br/>
                <textarea name="str" required placeholder="Введите Описание"
                        class="form-control" value={str} onInput={e => setStr(e.target.value)}></textarea><br/>
                <button class="my_button me-3 py-2 text-dark text-decoration-none" onClick={(e) => {
                e.preventDefault(); // предотвращаем стандартное поведение формы
                post({
                    'title': title,
                    'str': str
                })}}>Добавить Категорию</button>
            </form>
        </div>
    )
}

export default AddCategory;