import React, { useState, useEffect } from 'react'
import {Link, useLocation} from "react-router-dom";
import axios from 'axios'
import "./css/users.css"
import address from '../..';

function Users(){
    const [page, setPage] = useState([]);
    const [numPage, setNumPage] = useState(1);
    const location = useLocation();
    const url = location.pathname;

    useEffect(() => {
        async function fetchData() {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://${address}:8080/users/${numPage}`,
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
              };
            let controller = new AbortController();
            await axios.request(config).then(response => {
                setPage(response.data);
              })
              .catch(error => {
                console.log(error.config);
              })
            return controller.abort();
        }
        if ("/users" == url){
        fetchData();}
    },[numPage, "/users" == url ? true: false]);
    
    const setRole = (id,role) => {
      console.log(id);
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://${address}:8080/setrole?id=${id}&role=${role}&page=${numPage}`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      };
      axios.request(config).then(response => {
        console.log(response.data);
        //setQuery(!query)
        setPage(response.data);
        })
        .catch(error => {
          console.log(error.config);
        })
    };
    return(
        <div>
        {page.users ? 
          (
            <div>
              {localStorage.role == "ADMIN" ? (
                <div>
                    <table>
                        <tr>
                            <th>id</th>
                            <th>email</th>
                            <th>name</th>
                            <th>role</th>
                            <th>SETrole</th>
                        </tr>
                        {page.users.map(user => (
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.role}</td>
                                <td class="roles">
                                    <button onClick={() => setRole(user.id, 1)}>USER</button>
                                    <button onClick={() => setRole(user.id, 2)}>MODER</button>
                                    <button onClick={() => setRole(user.id, 3)}>ADMIN</button>
                                </td>
                            </tr>
                            ))}
                        <tr> 
                        </tr>
                    </table>
                    <div class="my-numPage">
                        {numPage > 1 ?
                            (<a href="#head"><button onClick={() => setNumPage(numPage - 1)}>←</button></a>):
                            (null)
                        }  
                        {page.page} 
                        {page.maxPage == page.page ? (null): (<>...{page.maxPage}<a href="#head"><button onClick={() => setNumPage(numPage + 1)}>→</button></a></>)
                        }
                    </div>
                </div>
              ): null}
            </div>
          ): 
          (
              <>Loading...</>
          )
        }
        </div>            
    )
}

export default Users;