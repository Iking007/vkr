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
    const [communications, setCommunications] = useState();
    const location = useLocation();
    const url = location.pathname;

    useEffect(() => {
        async function fetchData(url) {
          let controller = new AbortController();
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://${address}:8080/edit/ad`,
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          };
          axios.request(config).then(response => {
              console.log(response.data);
              setTitle(response.data.title);
              setImg(response.data.image);
              setStr(response.data.str);
              setPrice(response.data.price);
              setCommunications(response.data.communications);
            })
            .catch(error => {
              console.log(error.config);
            })
          return controller.abort();
        }
        if ("/edit/ad" == url){
          fetchData(url)};
    },["/edit/ad" == url ? true: false]);

    const post = (data = {}) => {
        console.log(data);
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `http://${address}:8080/addad`,
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
            
            <form class="my-form">
                {"/edit/ad" != url ? "Создание объявления": "Редактирование объявления"}
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
                <textarea name="communications" required placeholder="Введите как с вами можно связаться"
                    class="form-control" value={communications} onInput={e => setCommunications(e.target.value)}></textarea><br/>
                <button class="my-button" onClick={(e) => {
                    e.preventDefault(); // предотвращаем стандартное поведение формы
                    post({
                    'title': title,
                    'img': img,
                    'str': str,
                    'price': price,
                    'communications': communications
                })}}>{"/edit/ad" != url ? "Выставить объявление": "Сохранить изменения"}</button>
            </form>
        </div>
    )
}

export default AddAd;