import React from 'react'
import "./Header.scss";
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom';
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {

  const token=localStorage.getItem('rentoToken')

  const handleOut=()=>{
    localStorage.removeItem('rentoToken');
    navigate("/");
  }

  useEffect(() => {
   
    // const token=localStorage.getItem('rentoToken')
  }, []);

  const navigate = useNavigate();

  const handleClick = (route) => {
    console.log(token)
    console.log("Click")
    navigate(route);
  };

  const handleClic = (route) => {
      if(token){
        
        console.log("route")
        navigate(route);
      }
      else{
        console.log("login")
        navigate("/login");
      }
  };
  
  return (
    <header className='main-header'>
    <div className='header-content'>
        <ul className="left">
            <li onClick={()=>handleClick("/")}>Home</li>
            <li>Rooms</li>
            <li onClick={()=>handleClic("/chats") }>Chats</li>
            {/* <li>Search By</li> */}
        </ul>
        <ul className="right">
        <li onClick={()=>handleClick("/login") } style={{ display: localStorage.getItem('rentoToken') ? 'none':'' }}
>Login</li>
<li onClick={handleOut} style={{ display: !localStorage.getItem('rentoToken') ? 'none':'' }}
>Logout</li>
<li onClick={()=>handleClic("/Bill")}>BillBoard</li>
        <li onClick={()=>handleClic("/Sell")}>Sell</li>
        </ul>
        <div className="center" style={{backgroundImage: "linear-gradient(to right,#808BE6, #3ACBE9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textTransform: "capitalize"}}>TORENTO</div>       
    </div>
    </header>
  )
}

export default Header
