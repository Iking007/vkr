import React, { useState, useEffect} from 'react'
import {useLocation} from "react-router-dom";
import axios from 'axios'
import "./css/goods.css"
import "./css/addProduct.css"
import address from '../..';

function AddProduct(){
    const [categories, setСategories] = useState([]);
    const [category, setСategory] = useState();
    const [categoryTitle, setСategoryTitle] = useState("");
    const [title, setTitle] = useState();
    const [img, setImg] = useState();
    const [str, setStr] = useState();
    const [id, setId] = useState(null);
    const [price, setPrice] = useState();

    const location = useLocation();
    const url = location.pathname;
    
    useEffect(() => {
    async function fetchData() {
      setId(null);
      await axios.get(`http://${address}:8080/categories`).then(response => {
            setСategories(response.data.categories);
        })
        .catch(error => {
          console.log(error.config);
        })
    }
    async function edit() {
        let controller = new AbortController();
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `http://${address}:8080${url}`,
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        };
        axios.request(config).then(response => {
            //console.log(response.data);
            setСategory(response.data.category);
            setTitle(response.data.title);
            setImg(response.data.image);
            setStr(response.data.str)
            setPrice(response.data.price);
            setСategoryTitle(response.data.categoryTitle)
            setId(response.data.id)
          })
          .catch(error => {
            console.log(error.config);
          })
        return controller.abort();
      }
    if ("/add/product" == url || "/edit/product" == url.substring(0,13)) {
    fetchData()};
    if ("/edit/product" == url.substring(0,13)) {edit()};
    },[url,"/add/product" == url ? true: false]);

    const post = (data = {}) => {
        console.log(data);
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `http://${address}:8080/add/product`,
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

    var MakeItemСategory = function(X) {
        return <option value={X.id}>{X.title}</option>;
    };
    return(
        <div>
            
            <form class="my-form">
              {"/edit/product" != url.substring(0,13) ? "Добавление товара": "Редактирование товара"}
                <input type="text" required
                    name="title" placeholder="Введите название"
                    class="form-control" value={title} onInput={e => setTitle(e.target.value)} autocomplete="off"/><br/>
                <select type="text" name="category" value={categoryTitle} required placeholder="Выберите категорию" class="form-control" onChange={e => {setСategory(e.target.value)}}>
                    <option value="" selected disabled>Выберите категорию</option>
                    {categories.map(MakeItemСategory)}
                </select><br/>
                <input type="text"
                    name="img" placeholder="Введите ссылку на картинку"
                    class="form-control" value={img} onInput={e => setImg(e.target.value)} autocomplete="off"/><br/>
                <textarea name="str" required placeholder="Введите опиcание"
                        class="form-control" value={str} onInput={e => setStr(e.target.value)}></textarea><br/>
                <input type="number"
                    name="img" placeholder="Введите цену"
                    class="form-control" value={price} onInput={e => setPrice(e.target.value)} autocomplete="off"/><br/>
                <button class="my-button" onClick={(e) => {
                e.preventDefault(); // предотвращаем стандартное поведение формы
                post({
                    'title': title,
                    'category_id': category,
                    'img': img,
                    'str': str,
                    'price': price,
                    'id': id
                })}}>{"/edit/product" != url.substring(0,13) ? "Добавить товар": "Сохранить изменения"}</button>
            </form>
        </div>
    )
}

export default AddProduct;