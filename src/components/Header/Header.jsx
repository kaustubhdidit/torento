import React from 'react'
import "./Header.scss";
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom';
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {

  const handleOut=()=>{
    localStorage.removeItem('token');
    navigate("/");
  }
//   const handleOut= async(e)=>{
//     e.preventDefault();

//     const response = await fetch("http://localhost:3000/api/v1/users/logout", {
//         method: "GET", 
//         headers: {
//           "Content-Type": "application/json",
         
//         },
        
//         // body: JSON.stringify({name:credential.name, email:credential.email, password:credential.password}),
//       });
      
      
//       const json = await response.json()
//       console.log(json)
//       if(json.success){
//         // localStorage.setItem('token', json.authtoken);
//         // props.showAlert("Registered successfully", "success")
//         navigate("/");
     
//       }
// }


  useEffect(() => {
    if(localStorage.getItem('token')){

    }
  }, []);

  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };

  const handleClic = (route) => {
      if(localStorage.getItem('token')){
        
        // console.log(localStorage.getItem('token'))
        navigate(route);
      }
      else{
        navigate("/login");
      }
  };
  
  return (
    <header className='main-header'>
    <div className='header-content'>
        <ul className="left">
            <li onClick={()=>handleClick("/")}>Home</li>
            <li>Rooms</li>
            <li>Pricing</li>
            <li>Search</li>
        </ul>
        <ul className="right">
        <li onClick={()=>handleClick("/login") } style={{ display: localStorage.getItem('token') ? 'none':'' }}
>Login</li>
<li onClick={handleOut} style={{ display: !localStorage.getItem('token') ? 'none':'' }}
>Logout</li>
<li onClick={()=>handleClic("/Bill")}>BillBoard</li>
        <li onClick={()=>handleClic("/Sell")}>Sell</li>
        </ul>
        <div className="center">TORENTO</div>       
    </div>
    </header>
  )
}

export default Header
