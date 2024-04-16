import React, {useState} from 'react'
import {useLocation} from "react-router-dom";
import {Link } from "react-router-dom";
import "./header.css"
import Logo from "./images/logo.png"


function Header(){
    const [isOpen, setOpen] = useState(false)
    const location = useLocation();
    const url = location.pathname;
    return(
        <div class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom my_menu" id="head" sticky="top">
            <Link to="/" class="d-flex align-items-center text-dark text-decoration-none">
                <img src={Logo} class="my_logo"></img>
            </Link>

            <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                <div class="menu">
                    <form class="d-flex" action={url.substring(0,4) != "/ads" ? "/goods/query/1": "/ads/query/1"} method="get">
                        <input type="text" autocomplete="off" name="title" class="me-3 py-2 text-dark text-decoration-none form-control my_input" placeholder="Поиск"/>
                        <button type="submit" class="my_button me-3 py-2 text-dark text-decoration-none">
                            Найти
                        </button>
                    </form>
                    <Link class="me-3 py-2 text-dark text-decoration-none my_link" to="/">Главная</Link>
                    <li class='shop_button'>
                        <Link class="me-3 py-2 text-dark text-decoration-none my_link" to="/goods">Магазин</Link>
                        <Link class="me-3 py-2 text-dark text-decoration-none my_link button_category" to="/categories">Категории</Link>
                    </li>
                    <Link class="me-3 py-2 text-dark text-decoration-none my_link" to="/ads">Объявления</Link>
                    {localStorage.token != null ? <Link class="me-3 py-2 text-dark text-decoration-none my_link" to="/mycart">Корзина</Link>: null}
                    {localStorage.token == null ? <Link class="me-3 py-2 text-dark text-decoration-none my_link" to="/login">Вход</Link>: 
                        <Link class="me-3 py-2 text-dark text-decoration-none my_link" to="/prof">Профиль</Link>
                    }
                </div>
                <div class="dropdown_menu">
                    <button class="button_menu" onClick={() => setOpen(!isOpen)}>МЕНЮ</button>
                    <ul className={isOpen ? "list_menu_open" : "list_menu_close"}>
                    <form class="d-flex" action={url.substring(0,4) != "/ads" ? "/goods/query/1": "/ads/query/1"} method="get">
                        <input type="text" autocomplete="off" name="title" class="me-3 py-2 text-dark text-decoration-none form-control my_input" placeholder="Поиск"/>
                        <button type="submit" class="my_button me-3 py-2 text-dark text-decoration-none">
                            Найти
                        </button>
                    </form>
                    <li><Link class="me-3 py-2 text-dark text-decoration-none my_link" to="/">Главная</Link></li>
                    <li><Link class="me-3 py-2 text-dark text-decoration-none my_link" to="/goods">Магазин</Link></li>
                    <li><Link class="me-3 py-2 text-dark text-decoration-none my_link" to="/categories">Категории</Link></li>
                    <li><Link class="me-3 py-2 text-dark text-decoration-none my_link" to="/ads">Объявления</Link></li>
                    {localStorage.token != null ? <li><Link class="me-3 py-2 text-dark text-decoration-none my_link" to="/mycart">Корзина</Link></li>: null}
                        {localStorage.token == null ? <Link class="me-3 py-2 text-dark text-decoration-none my_link" to="/login">Вход</Link>: 
                            <li><Link class="me-3 py-2 text-dark text-decoration-none my_link" to="/prof">Профиль</Link></li>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header;