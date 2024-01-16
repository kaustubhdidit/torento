import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
// import jwt from "jsonwebtoken";

import { imageDb } from './Config';

import Header from '../Header/Header';
import Alert from '../Alert';

import './Create.scss';

const Create = (props) => {
  const [creden, setCreden] = useState({name:'',phone:'', photo: '', price: '', title: '', address:'', description: '', user:'' });
  const [img, setImg] = useState(null);
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (img) {
      const imgRef = ref(imageDb, `files/${uuidv4()}`);
      try {
        await uploadBytes(imgRef, img);

        const url = await getDownloadURL(imgRef);
        const token=localStorage.getItem('token');
        // console.log("haha")
        // console.log(token)
        // console.log("haha")

        setCreden({ ...creden, photo: url });

        // const extractUserIdFromToken = (token) => {
        //   try {
        //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //     return decoded._id; // Assuming _id is the user's identifier in the payload
        //   } catch (error) {
        //     // Token verification failed (token is invalid or has expired)
        //     return null;
        //   }
        // };
        // console.log(token)
        const response = await fetch('https://totento-backend.onrender.com/api/v1/room/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          
          body: JSON.stringify({
            name:token,
            phone:token,
            address:creden.address,
            photo: url,
            price: creden.price,
            title: creden.title,            
            description: creden.description,
            user: token,
          }),
        });

        const json = await response.json();

        if (json.success) {
       console.log(json)
          // localStorage.setItem('token', json.authtoken);
          const token = localStorage.getItem('token');
          // const userId = extractUserIdFromToken(token);
          
          console.log(token);
          console.log('Room created successfully');
          navigate('/');
        } else {
          console.log(json);
          props.showAlert('Invalid details', 'danger');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const onChange = (e) => {
    setCreden((prevCredential) => ({
      ...prevCredential,
      [e.target.name]: e.target.value,
    }));
  };

    return (
    <>
    <Header/>
    
<br />
    <form onSubmit={handleSubmit} style={{ margin: 'auto', width:'9cm' }}>
    <div className="custom-file" >
        <input type="file" style={{color:'gray'}} className="custom-file-input" id="file-upload" 
            accept='.jpeg, .png, .jpg'
            onChange={(e)=>setImg(e.target.files[0])}/>
        {/* <label className="custom-file-label" htmlFor="customFile">Choose file</label> */}
    </div>
<br />
  <div className="form-group row" >
    {/* <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Price</label> */}
    <div className="col-sm-10">
      <input type="text" className="form-control" id="inputEmail3" name="price" placeholder="Price" value={creden.price} onChange={onChange} />

    </div>
  </div>
<br />
  <div className="form-group row" >
    {/* <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Title</label> */}
    <div className="col-sm-10">
      <input type="text" className="form-control" id="inputPassword3" name="title" placeholder="Title" value={creden.title}
            onChange={onChange}/>
    </div>
  </div>
<br />
<div className="form-group row" >
    {/* <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Address</label> */}
    <div className="col-sm-10">
      <input type="text" className="form-control" id="inputPassword3" name="address" placeholder="Address" value={creden.address}
            onChange={onChange}/>
    </div>
  </div>
<br />
<div className="form-group row" >
    {/* <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Desc.</label> */}
    <div className="col-sm-10">
      <input type="text" className="form-control" id="inputDesc3" name="description" placeholder="Description" value={creden.description}
            onChange={onChange}/>
    </div>
  </div>
<br />
  <div className="form-group row" >
    <div className="col-sm-10">
      <button type="submit" className="btn btn-primary">Create</button>
    </div>
  </div>
</form>
   
    </>
  )
};

export default Create;

