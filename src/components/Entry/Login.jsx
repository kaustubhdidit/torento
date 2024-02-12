import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import Home from "../Home/home";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import Alert from "../Alert";
import loader from "../../img/loader1.gif"
import torent from "../../assets/loginlog.png"
import "./Login.scss";
import { auth } from "../../firebase";

const Login = (props) => {
  const [loading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState({email:"" , password:""})
  const navigate= useNavigate();

  const email = credentials.email;
            const password =credentials.password;

  const handleSubmit= async(e)=>{
    setLoading(true);
      e.preventDefault();

      const response = await fetch("http://localhost:3001/api/v1/users/login", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
           
          },
          
          body: JSON.stringify({email:credentials.email, password:credentials.password}),
        });
        
        const json = await response.json()
        // console.log(json)
        if(json.success){
          
          // const userId = extractUserIdFromToken(token);
          
          
          localStorage.setItem('rentoToken', json.authtoken);
          const token = localStorage.getItem('rentoToken');
          // console.log(token);
          // props.showAlert("Logged in successfully", "success")
          // console.log(localStorage.getItem('rentoToken').json)
          const res=await signInWithEmailAndPassword(auth, email, password);
          localStorage.setItem('fbuid',res.user.uid)
          // console.log("paka")
          // console.log(res)
          // console.log("paka")
          setLoading(false);
          navigate("/");
       
        }
        else{
          setLoading(false);
          props.showAlert("Invalid details", "danger")
        }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };


  return (
    <>
    <div className="logHolder">

<div style={{ display:'flex',justifyContent:'center',alignItems:'center'}}>
      {/* <h1 className="tope">TORENTO</h1> */}
      <img src={torent} style={{width:'300px',  marginTop:'2cm'}} alt="" />
      </div>
    
    <form onSubmit={handleSubmit} style={{ width: '9cm', margin: 'auto' }}>
      <div className="mb-3" >
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
      </div>
      <button disabled={loading} style={{backgroundColor:'#0d6efd'}} type="submit" className="btn btn-primary">Submit</button>
    </form>
    <Link disabled={loading} style={{color:'gray'}} to="/SignUp" role="button">SignUp</Link>
    <div style={{display:'flex', justifyContent:'center'}}>
    <img  style={{display:loading?'':'none',height:"2cm"}} src={loader} alt="" />
    </div>
    </div>
    </>
  );
}

export default Login