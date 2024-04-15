
import React, { useState, useEffect } from 'react'
import {Link} from "react-router-dom";
import axios from "axios";
import address from '../..';

function Reg(){
    const [error, setError] = useState(false);
    const [name, setName] = useState([]);
    const [surname, setSurname] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    // const params = new URLSearchParams(location.search);
    //window.location.replace("/")

    const post = (data = {}) => {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://${address}:8080/reg`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data: data
      };
      axios.request(config).then(response => {
            //console.log(response.data);
            localStorage.token = response.data.access_token;
            window.location.replace("/prof");
          //console.log(response.data);
        })
        .catch(error => {
          setError(true)
          console.log(error.config);
        })
    };
    
    return(
        <div>
        <form>
            <h1 class="h3 mb-3 fw-normal">Заполните форму</h1>

            <div class="form-floating">
                <input required type="text" name="name" class="form-control" value={name} onInput={e => setName(e.target.value)} id="floatingName"/>
                <label for="floatingName">Имя</label>
            </div>
            <div class="form-floating">
            <input required type="text" name="surname" class="form-control" value={surname} onInput={e => setSurname(e.target.value)} id="floatingName"/>
                <label for="floatingName">Фамилия</label>
            </div>            
            <div class="form-floating" >
                <input required type="email" name="email" class="form-control" value={email} onInput={e => setEmail(e.target.value)} placeholder="name@example.com"/>
                <label for="floatingInput">Ваша действующая почта</label>
            </div>
            <div class="form-floating">
                <input required type="password" name="password" class="form-control" value={password} onInput={e => setPassword(e.target.value)} id="floatingPassword" minlength="8" placeholder="Password"/>
                <label for="floatingPassword">Пароль</label>
            </div>
            {error == true ? <p>Ошибка регистрации, вероятно такой пользоватеть уже существует</p>: null}
            <Link class="w-100 btn btn-lg btn-primary" onClick={() =>post({'name': name, "surname": surname, "email": email, "password": password})}>Зарегистрироваться</Link>
        </form>
    </div>
    )
}

export default Reg;