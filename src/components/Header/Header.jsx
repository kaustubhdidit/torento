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
        <ul className="leftH">
            <li className='hme' onClick={()=>handleClick("/")}>Home</li>
            {/* <li>Rooms</li> */}
            <li onClick={()=>handleClic("/chats") }>Chats</li>
            {/* <li>Search By</li> */}
        </ul>
        <ul className="rightH">
        <li onClick={()=>handleClick("/login") } style={{ display: localStorage.getItem('rentoToken') ? 'none':'' }}
>Login</li>
<li onClick={handleOut} style={{ display: !localStorage.getItem('rentoToken') ? 'none':'' }}
>Logout</li>
<li onClick={()=>handleClic("/Bill")}>BillBoard</li>
        <li onClick={()=>handleClic("/Sell")}>Sell</li>
        </ul>
        <div  onClick={()=>handleClick("/")} className="center" id='logo' style={{backgroundImage: "linear-gradient(to right,#808BE6, #3ACBE9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textTransform: "capitalize"}}>TORENTO</div>

        <section class="p-menu1" id='penu'>
          
  <nav id="navbar" class="navigation" role="navigation">
    <input id="toggle1" type="checkbox" />
    <label class="hamburger1" for="toggle1">
      <div class="top"></div>
      <div class="meat"></div>
      <div class="bottom"></div>
    </label>
  
    <nav class="menu1">
      <a class="link1" onClick={()=>handleClick("/login") } style={{ display: localStorage.getItem('rentoToken') ? 'none':'' }} href="">Login</a>
      <a class="link1" onClick={handleOut} style={{ display: !localStorage.getItem('rentoToken') ? 'none':'' }} href="">Logout</a>
      <a class="link1" onClick={()=>handleClic("/Sell")} href="">Sell</a>
      <a class="link1" onClick={() => {localStorage.removeItem('chatFb'); handleClic( "/sidebar")} } href="">Chats</a>

      <a class="link1" onClick={()=>handleClic("/Bill")} href="">BillBoard</a>
      {/* <a class="lin1 kbutton-nav" href="">Contact</a> */}
    </nav>
</nav>
</section>      
    </div>
    </header>
  )
}

export default Header
