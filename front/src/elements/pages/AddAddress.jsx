import React, { useState, useEffect} from 'react'
import {useLocation} from "react-router-dom";
import axios from 'axios'
import "./css/goods.css"
import "./css/addProduct.css"
import address from '../..';

function AddAddress(){
  const [city, setCity] = useState();
  const [street, setStreet] = useState();
  const [home, setHome] = useState();
  const [flat, setFlat] = useState();
  const location = useLocation();
  const url = location.pathname; 
    
    
  useEffect(() => {
    async function fetchData(url) {
      let controller = new AbortController();
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://${address}:8080/edit/address`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      };
      axios.request(config).then(response => {
          console.log(response.data);
          setCity(response.data.city);
          setStreet(response.data.street);
          setHome(response.data.home);
          setFlat(response.data.flat);
        })
        .catch(error => {
          console.log(error.config);
        })
      return controller.abort();
    }
    if ("/edit/address" == url){
      fetchData(url)};
},["/edit/address" == url ? true: false]);

    const post = (data = {}) => {
      console.log(data);
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://${address}:8080/addaddress`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: data
      };
      
      axios.request(config).then(response => {
        window.location.href = "/prof";
        })
        .catch(error => {
          console.log(error.config);
      })
    };
    return(
        <div> 
          <form class="my-form">
            {"/edit/address" != url ? "Добавление Адреса": "Редактирование адреса"}
            <input type="text" required
                name="city" placeholder="Введите город"
              class="form-control" value={city} onInput={e => setCity(e.target.value)} autocomplete="off"/><br/>
            <input type="text" required
              name="street" placeholder="Введите улицу"
              class="form-control" value={street} onInput={e => setStreet(e.target.value)} autocomplete="off"/><br/>
            <input type="text" required
                name="home" placeholder="Введите дом"
                class="form-control" value={home} onInput={e => setHome(e.target.value)} autocomplete="off"/><br/>
              <input type="num" 
                name="home" placeholder="Введите номер квартиры"
                class="form-control" value={flat} onInput={e => setFlat(e.target.value)} autocomplete="off"/><br/>
            <button class="my-button" onClick={(e) => {
                e.preventDefault(); // предотвращаем стандартное поведение формы
                post({
                'city': city,
                'street': street,
                'home': home,
                'flat': flat
            })}}>{"/edit/address" != url ? "Добавить Адрес": "Сохранить изменения"}</button>
          </form>
        </div>
    )
}

export default AddAddress;