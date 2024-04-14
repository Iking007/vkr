import React, { useState, useEffect} from 'react'
import {useLocation} from "react-router-dom";
import axios from 'axios'
import "./css/goods.css"
import "./css/addProduct.css"
import address from '../..';

function AddAd(){
    const [title, setTitle] = useState();
    const [img, setImg] = useState();
    const [str, setStr] = useState();
    const [price, setPrice] = useState();

    const post = (data = {}) => {
        console.log(data);
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `http://${address}:8080/add/ad`,
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          data: data
        };
        axios.request(config).then(response => {
            console.log(response.data);
            window.location.href = "/prof"
            //console.log(response.data);
          })
          .catch(error => {
            console.log(error.config);
          })
      };
    return(
        <div>
            Создание объявления
            <form>
                <input type="text" required
                    name="title" placeholder="Введите название"
                    class="form-control" value={title} onInput={e => setTitle(e.target.value)} autocomplete="off"/><br/>
                <input type="text"
                    name="img" placeholder="Введите ссылку на картинку"
                    class="form-control" value={img} onInput={e => setImg(e.target.value)} autocomplete="off"/><br/>
                <textarea name="str" required placeholder="Введите опиcание"
                        class="form-control" value={str} onInput={e => setStr(e.target.value)}></textarea><br/>
                <input type="number"
                    name="img" placeholder="Введите цену"
                    class="form-control" value={price} onInput={e => setPrice(e.target.value)} autocomplete="off"/><br/>
                <button class="my-button" onClick={() => post({
                    'title': title,
                    'img': img,
                    'str': str,
                    'price': price
                })}>Выставить объявление</button>
            </form>
        </div>
    )
}

export default AddAd;