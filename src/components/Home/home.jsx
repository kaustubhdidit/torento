import React from 'react'
import "./home.scss";
import { createContext } from "react";
import { useContext, useEffect, useRef } from "react";
import Category from './Category/Category';
import Header from '../Header/Header';
const home = () => {
  return (
    <div>

      <div className="main-content">
      <Header/>
        <h1 className='head'>Best rooms near you</h1>
            <div className="layout">
         <Category/>
            </div>
      </div>
    </div>
  )
}

export default home;