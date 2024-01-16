import React from 'react'
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import Home from "../Home/home";
import { Link, useLocation } from "react-router-dom";
import Alert from "../Alert";
import torentologo from "../../assets/torentologo.png"

const SignUp = (props) => {



        const [credential, setCredential] = useState({name:"",email:"" , password:""})
        const navigate= useNavigate();
      
        const handleSubmit= async(e)=>{
            e.preventDefault();
      
            const response = await fetch("https://totento-backend.onrender.com/api/v1/users/new", {
                method: "POST", 
                headers: {
                  "Content-Type": "application/json",
                 
                },
                
                body: JSON.stringify({name:credential.name, email:credential.email, phone:credential.phone, password:credential.password}),
              });
              
              
              const json = await response.json()
              console.log(json)
              if(json.success){
                localStorage.setItem('token', json.authtoken);
                props.showAlert("Registered successfully", "success")
                console.log(localStorage.getItem('token').json)
                navigate("/");
             
              }
              else{
                props.showAlert("Invalid details", "danger")
              }
        }
      
        const onChange = (e) => {
        //   setCredential({ ...credential, [e.target.name]: e.target.value });
        setCredential((prevCredential) => ({
            ...prevCredential,
            [e.target.name]: e.target.value,
          }));
        };

  return (
    <>

    <div className="sinup" style={{display: 'flex'}}>
    <div className="left" style={{ display: 'flex', width: '38%', height: '100vh', backgroundColor: 'black', alignItems:'center', justifyContent: 'center' }}>
  {/* <div className="tope" style={{ color: 'white', display:'flex',   boxShadowShadow: '0 0 20px rgba(255, 255, 255, 0.9)' }}> */}
  <div className="tope" style={{ color: 'white', display:'flex', boxShadow: '0 0 20px rgba(255, 255, 255, 0.9)', padding: '10px', borderRadius: '10px' }}>
  <img src={torentologo} style={{width:'300px', marginBottom:'3cm',color: 'white', display:'flex', boxShadow: '0 0 20px rgba(255, 255, 255, 0.9)', padding: '10px', borderRadius: '10px'}} alt="hello" />
  </div>
  
</div>

    {/* <div className="left" style={{display: 'flex', width: '38%', height:'100vh', backgroundColor: 'black'}}><h1 className="tope" style={{color:'white', marginTop:'8cm'}}>TORENTO</h1></div> */}
        <div className='right' style={{marginTop:'5.7cm', marginLeft:'7cm'}}>
      
      <h1>SignUp</h1>
    
    <form onSubmit={handleSubmit} style={{ width: '9cm', margin: 'auto' }}>
    <div className="mb-3" >
        {/* <label htmlFor="exampleInputEmail1" className="form-label">Name</label> */}
        <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credential.name}
            onChange={onChange}
            placeholder='Name'
          />
      </div>
      <div className="mb-3" >
        {/* <label htmlFor="exampleInputEmail1" className="form-label">Email address</label> */}
        <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credential.email}
            onChange={onChange}
            placeholder='Email'
          />
        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
      </div>
      <div className="mb-3" >
        {/* <label htmlFor="exampleInputPassword1" className="form-label">Phone Number</label> */}
        <input
            type="text"
            className="form-control"
            id="pghone"
            name="phone"
            value={credential.phone}
            onChange={onChange}
            placeholder='Phone Number'
          />
      </div>
      <div className="mb-3">
        {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
        <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credential.password}
            onChange={onChange}
            placeholder='Password'
          />
      </div>
      <button type="submit" className="btn btn-primary">SignUp</button>
    </form>
    <Link style={{color:'gray'}} to="/login" role="button">Login</Link>
    </div>

    </div>
    </>
  )
}

export default SignUp