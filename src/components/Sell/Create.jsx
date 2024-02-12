import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
// import jwt from "jsonwebtoken";

import { imageDb } from './Config';
import loader from "../../img/loader1.gif"
import Header from '../Header/Header';
import Alert from '../Alert';

import './Create.scss';

const Create = (props) => {
  const [loading, setLoading] = useState(false);
  const [creden, setCreden] = useState({name:'',phone:'',fbuid:'', photo: '', price: '', area:'',title: '', address:'', description: '', residents:'', user:'' });
  const [img, setImg] = useState(null);
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (img) {
      const imgRef = ref(imageDb, `files/${uuidv4()}`);
      try {
        await uploadBytes(imgRef, img);

        const url = await getDownloadURL(imgRef);
        const token=localStorage.getItem('rentoToken');
        const fbid=localStorage.getItem('fbuid');

        setCreden({ ...creden, photo: url });

        const response = await fetch("http://localhost:3001/api/v1/room/new", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          
          body: JSON.stringify({
            name:token,
            phone:token,
            fbuid:fbid,
            address:creden.address,
            photo: url,
            price: creden.price,
            title: creden.title,
            area:creden.area,            
            description: creden.description,
            residents: creden.residents,
            user: token,
          }),
        });

        const json = await response.json();

        if (json.success) {
      //  console.log(json)
          // localStorage.setItem('token', json.authtoken);
          const token = localStorage.getItem('rentoToken');
          // const userId = extractUserIdFromToken(token);
          
          // console.log(token);
          console.log('Room created successfully');
          setLoading(false);
          navigate('/');
        } else {
          setLoading(false);
          // console.log(json);
          props.showAlert('Invalid details', 'danger');
        }
      } catch (error) {
        setLoading(false);
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
    <di style={{display:'flex',justifyContent:'center'}}>
    <h1  className='head'  >Add your room details</h1>
    </di>
    
<br />
<div className='holder' style={{ display:'flex',justifyContent:'center',}}>
    <form onSubmit={handleSubmit} style={{  margin: 'auto', width:'9cm' }}>
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
    {/* <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Address</label> */}
    <div className="col-sm-10">
      <input type="text" className="form-control" id="inputPassword3" name="area" placeholder="Locality" value={creden.area}
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
    {/* <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Desc.</label> */}
    <div className="col-sm-10">
      <input type="text" className="form-control" id="inputDesc3" name="residents" placeholder="No.of residents" value={creden.residents}
            onChange={onChange}/>
    </div>
  </div>
<br />
  <div className="form-group row" >
    <div className="col-sm-10">
      <button disabled={loading}  style={{backgroundColor:'#0d6efd'}} type="submit" className="btn btn-primary">Create</button>
    </div>
  </div>
</form>
</div>
<div style={{display:'flex', justifyContent:'center'}}>
    <img  style={{display:loading?'':'none',height:"2cm"}} src={loader} alt="" />
    </div>

   
    </>
  )
};

export default Create;

