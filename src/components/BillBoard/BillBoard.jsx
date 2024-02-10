import "./BillBoard.scss";
import React, { useState, useEffect , useRef} from 'react';
import { getStorage, ref as firebaseRef, deleteObject } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import Header from "../Header/Header";
import { imageDb } from "../Sell/Config";

const BillBoard = ({ props }) => {
  // const firebaseStorageRef = firebaseRef(imageDb);
  const [rooms, setRooms] = useState([]);
  const [itemsOccupied, setItemsOccupied] = useState({}); // State to store isOccupied for each item
  // const updateRoom= props;
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const ref = useRef(null);
  const updateButtonRef = useRef(null);
  const refClose = useRef(null);
  const [room, setRoom] = useState({
    id: "",
    title: "",
    price:"",
    description: "",
    address: "",
    phone:"",
  });

  const updateRoom = (currentRoom) => {
    ref.current.click();
    console.log("Executed");
    // console.log(currentRoom._id)
    setRoom({
      id: currentRoom._id,
      title: currentRoom.title,
      price: currentRoom.price,
      description: currentRoom.description,
      address: currentRoom.address,
      phone:currentRoom.phone,
    });
    
  };

  const handleClic = (e) => {
    console.log("Updating", room);
    e.preventDefault();
    editRoom(room.id,room.title, room.price, room.description, room.address, room.phone);
    // refClose.current.click();
    // props.showAlert("Updated successfully", "success")
  };

  const editVac=async (i)=>{
    // console.log("haha")
    // console.log(i)

    // console.log(price)
    // API Call
    const response = await fetch(`https://rentoback-5kdr.onrender.com/api/v1/room/vac/${i._id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('rentoToken')
      },
      body: JSON.stringify({i}),
    });

    if (response.ok) {
      setRooms((prevRooms) => {
        return prevRooms.map(room => (room._id === i._id ? { ...room, display: !room.display } : room));
      });
    }
  } 
    
    // window.location.reload();
    
  

  const editRoom=async (id, title,price, description, address, phone)=>{
    // console.log("haha")
    // console.log(id)

    // console.log(price)
    // API Call
    const response = await fetch(`https://rentoback-5kdr.onrender.com/api/v1/room/edit/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('rentoToken')
      },
      body: JSON.stringify({id,title,price, description, address, phone}),
    });
    // const json= await response.json(); 
    


    let newRooms = JSON.parse(JSON.stringify(rooms))
    //Logic to edit in clint
    for (let index = 0; index < newRooms.length; index++) {
      const element = newRooms[index];
      if(element._id=== id){
        newRooms[index].title=title;
        newRooms[index].price=price;
        newRooms[index].description= description;
        newRooms[index].address=address;
        newRooms[index].phone= phone;
        break;
      }
      
    }
    setRooms(newRooms);
    window.location.reload();
    
  }

  const handleClick = (itemData) => {
    navigate("/Item", { state: { itemData } });
  };

  const handleDel = async (rinfo) => {
    try {
      const response = await fetch(`https://rentoback-5kdr.onrender.com/api/v1/room/del/${rinfo._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // window.location.reload();
        console.log("Room deleted successfully");
      } else {
        console.error(`Error deleting room: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const deleteImage = async (imageUrl) => {
    try {
      const storageRef = firebaseRef(imageDb, imageUrl);
      await deleteObject(storageRef);
      window.location.reload();
      console.log("Image deleted successfully from Firebase Storage");
    } catch (error) {
      console.error("Error deleting image from Firebase Storage:", error);
    }
  };

  useEffect(() => {
    // console.log(localStorage.getItem('token'));

    axios.get('https://rentoback-5kdr.onrender.com/api/v1/room/my', {
      params: {
        userid: localStorage.getItem('rentoToken'),
      },
    })
      .then((res) => {
        const initialItemsOccupied = res.data.rooms.reduce((acc, item) => {
          acc[item._id] = false; // Set initial isOccupied state for each item
          return acc;
        }, {});
        setItemsOccupied(initialItemsOccupied);
        setRooms(res.data.rooms);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const onChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };


  return (
    <div>
      <div className="main-content">
        <Header />

        <Button  style={{display:'none'}}ref={ref} variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header style={{display:'flex', border:'1px solid gray',  justifyContent:'center', backgroundColor:'black'}}>
          <Modal.Title style={{fontWeight:'bolder', color:'white'}}>Edit Room Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Your form content */}
          <form className='my-3'>
                <div className="mb-3">
                  <label style={{backgroundColor:'white', paddingLeft:'3px', paddingRight:'3px', scale:'0.9', position:'relative', top:'18px', color:'gray'}} htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={room.title}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label style={{backgroundColor:'white', paddingLeft:'3px', paddingRight:'3px', scale:'0.9', position:'relative', top:'18px', color:'gray'}}htmlFor="description" className="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    name="price"
                    value={room.price}
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>

                <div className="mb-3">
                  <label style={{backgroundColor:'white', paddingLeft:'3px', paddingRight:'3px', scale:'0.9', position:'relative', top:'18px', color:'gray'}}htmlFor="tag" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={room.description}
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>

                <div className="mb-3">
                  <label style={{backgroundColor:'white', paddingLeft:'3px', paddingRight:'3px', scale:'0.9', position:'relative', top:'18px', color:'gray'}}htmlFor="tag" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={room.address}
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>

                <div className="mb-3">
                  <label style={{backgroundColor:'white', paddingLeft:'3px', paddingRight:'3px', scale:'0.9', position:'relative', top:'18px', color:'gray'}}htmlFor="tag" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={room.phone}
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>


              </form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor:'#6c757d'}} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
          style={{backgroundColor:'#0d6efd'}}
            disabled={room.title.length < 5 || room.description.length < 5}
            variant="primary"
            onClick={handleClic}
          >
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>

        <h1 className='head'>Your listed rooms</h1>
        <div className="categories">
          {rooms.map((i) => (
            <div className="category" key={i._id}>
              <div className="image" onClick={() => handleClick(i)}><img src={i.photo} /></div>
              <div className="thre">
                <div className="left">
                <div className="desc">Price:&nbsp; <span style={{ borderRadius:'14px', paddingInline:"5px" ,fontWeight:'bold', color:'white'}}>₹{i.price}</span></div>
                <p style={{fontWeight:'bold', marginTop:'3px'}}>Title:&nbsp;<span style={{ borderRadius:'14px', paddingInline:"5px" ,fontWeight:'bold', color:'white',  display: 'inline-block',
      maxWidth: '225px', 
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'}}>{i.title}</span></p>
                </div>
              </div>
              <div className="form-check form-switch" style={{ position: 'relative', left: '0.5cm', bottom: '0.4cm' }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={`flexSwitchCheck${i._id}`}
                  checked={!i.display || false}
                  onChange={() => {setItemsOccupied((prev) => ({ ...prev, [i._id]: !prev[i._id] })); editVac(i)}}
                />

                <label className="form-check-label" htmlFor={`flexSwitchCheck${i._id}`} style={{fontWeight:'bold', color:'white', backgroundColor:!i.display ? 'Crimson' : 'MediumSeaGreen',fontSize:'small' ,paddingInline:'5px', borderRadius:'14px'}}>
                  {!i.display ? 'Occupied' : 'Vacant'}
                </label>
              </div>
              <div className="sg" style={{display:'flex'}}>
              <svg onClick={() => updateRoom(i)} xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
                <svg onClick={() => { handleDel(i); deleteImage(i.photo); }} xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillBoard;
