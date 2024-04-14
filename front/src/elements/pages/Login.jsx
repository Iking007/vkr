import React, { useState} from 'react'
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import address from '../..';


function Login(){
  const [error, setError] = useState(false);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [query, setQuery] = useState(false);
  const location = useLocation();
  // const params = new URLSearchParams(location.search);
  //window.location.replace("/")

  const post = (data = {}) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://${address}:8080/login`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data
    };
    axios.request(config).then(response => {
        //console.log(response.data);
        localStorage.token = response.data.access_token;
        window.location.replace("/prof")
        //console.log(response.data);
      })
      .catch(error => {
        setError(true)
        console.log(error.config);
      })
  };
    // if ("/login" == location.pathname.substring(0,6)){
    // postRequest({"email": email, "password": password})};
  // };
  return(
      <div>
        <form id='my_form'>
          <h1 class="h3 mb-3 fw-normal">Вход</h1>
          <div class="form-floating">
            <input required type="email" name="email" class="form-control" value={email} onInput={e => setEmail(e.target.value)} placeholder="name@example.com"/>
            <label for="floatingInput">Ваша почта</label>
          </div>
          <div class="form-floating">
            <input required type="password" name="password" class="form-control" value={password} onInput={e => setPassword(e.target.value)} minlength="8" placeholder="Password"/>
            <label for="floatingPassword">Пароль</label>
          </div>
          {error == true ? <p>Неверная почта или пароль</p>: null}

          <Link class="w-100 btn btn-lg btn-primary" onClick={() => post({"email": email, "password": password})}>Войти</Link>
        </form>
        <Link  to={"/reg"}>Зарегистрироваться</Link>
      </div>
  )
}

export default Login;