import React from 'react'
import Header from '../Header/Header'
import "./Item.scss"
import img2 from '../../assets/room1.png'
import { useLocation } from 'react-router-dom';

const Item = (props) => {
  const location = useLocation();
  const { itemData } = location.state || {};
  // console.log(itemData)
  return (
    <>
    <Header/>
    <div className='Item'>

      <div className="tab">

          <div className="ime">
            <img src={itemData.photo} alt="" />
          </div>

         <div className="right">
         <div className="title">
            <h3>Price</h3>
            <p>₹ {itemData.price}</p>
          </div>

          <div className="contact">
          <h3>Seller: &nbsp; <span style={{color:'gray'}}>{itemData.name}</span></h3>
            <p><span style={{fontWeight:'bold'}}>Contact Number:&nbsp;</span> {itemData.phone}</p>
           
          </div>

          <div className="address">
            <h3>Address of Seller</h3>
            <p>{itemData.address}</p>
          </div>
         </div>

         </div>

      <div className="desc">
            <h3>Description</h3>
            <p>{itemData.description}</p>
      </div>


    </div>
    </>
  )
}

export default Item