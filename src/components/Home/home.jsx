import React, { useState, useEffect } from 'react';
import { createContext } from "react";
import { useContext, useRef } from "react";
import axios from "axios";
import "./home.scss"
import Category from './Category/Category';
import Header from '../Header/Header';
const Home = ({home}) => {
  const [rooms, setRooms] = useState([]);


  useEffect(() => {
   
    // Fetch data from the API
    axios.get("https://rentoback-5kdr.onrender.com/api/v1/room/roomAll")
      .then((res) => {
        // console.log("first")
        // console.log(res.data.rooms)
        setRooms(res.data.rooms);  // Fix the data assignment here
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      // window.location.reload();
  }, []);
  return (
    <div>

      <div className="main-content">
      <Header/>
      {/* <h1  className='head text-2xl font-bold'>Locality</h1>
      <div className="areas">
      {rooms.map((i) => (         
                    <button>{i.area}</button>
                     ))}
                     </div> */}
        <h1  className='head'>Best rooms near you</h1>
            <div className="layout">
              
         <Category/>
            </div>
      </div>
    </div>
  )
}

export default Home;