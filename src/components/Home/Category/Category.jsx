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
    axios.get("http://localhost:3001/api/v1/room/roomAll")
      .then((res) => {
        // console.log("first")
        // console.log(res.data.rooms)
        setRooms(res.data.rooms);  // Fix the data assignment here
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
   
    return (
            
            <div className="categories">   
            {rooms.map((i) => (         
                    <div style={{display:i.display?"":"none"}} className="category" onClick={() => handleClick(i)} key={i._id}>
                      <div className="image"><img src={i.photo}/></div>
                        
                        <div className="desc">Price:&nbsp; <span style={{ borderRadius:'14px', paddingInline:"5px" ,fontWeight:'bold', color:'white'}}>₹{i.price}</span></div>
                        <p style={{fontWeight:'bold', marginTop:'3px'}}>Title:&nbsp;<span style={{ borderRadius:'14px', paddingInline:"5px" ,fontWeight:'bold', color:'white',  display: 'inline-block',
      maxWidth: '225px', 
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'}}>{i.title}</span></p>
                        <p style={{fontWeight:'bold', marginTop:'3px'}}>Address:&nbsp;<span style={{ borderRadius:'14px', paddingInline:"5px" ,fontWeight:'bold', color:'white',  display: 'inline-block',
      maxWidth: '225px', 
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'}}>{i.address}</span></p>
                    </div>
                     ))}
            </div> 
    );
};

export default Category;

