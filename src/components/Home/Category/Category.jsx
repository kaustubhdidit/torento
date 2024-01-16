
import "./Category.scss";
import React, { useState, useEffect } from 'react';
import img1 from "../../../assets/room1.png"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Category = ({ categories }) => {
    const [rooms, setRooms] = useState([]);
    const [items, setItems] = useState([]);

    const navigate=useNavigate();
 const handleClick=(itemData)=>{
    navigate("/Item", { state: { itemData } });
 }

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://totento-backend.onrender.com/api/v1/room/roomAll')
      .then((res) => {
        console.log("first")
        console.log(res.data.rooms)
        setRooms(res.data.rooms);  // Fix the data assignment here
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
   
    return (
        
            // <div className="categories">   
            // {rooms.map((i) => (         
            //         <div className="category" onClick={() => handleClick(i)} key={i._id}>
            //           <div className="image"><img src={i.photo}/></div>
            //             <div className="thre">
            //               <div className="left">
            //             <div className="desc">₹&nbsp;{i.price}</div>
            //             <p style={{fontWeight:'bold'}}>{i.title}</p>
            //             </div>
            //             <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
            //             </div>
            //         </div>
            //          ))}
            // </div>
            
            <div className="categories">   
            {rooms.map((i) => (         
                    <div style={{display:i.display?"":"none"}} className="category" onClick={() => handleClick(i)} key={i._id}>
                      <div className="image"><img src={i.photo}/></div>
                        
                        <div className="desc">₹&nbsp;{i.price}</div>
                        <p style={{fontWeight:'bold'}}>{i.title}</p>
                    </div>
                     ))}
            </div> 
    );
};

export default Category;
