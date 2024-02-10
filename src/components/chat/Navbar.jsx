import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../../firebase'
import { AuthContext } from '../../context/AuthContext'


const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  // console.log("haha")
  // console.log(currentUser)
  // console.log(currentUser.uid)
  // console.log("haha")

  return (


    <div className='navbar'>
    
      <div className="user">
        {/* <img src={currentUser.photoURL} alt="" /> */}
        <span style={{backgroundImage: "linear-gradient(to right, #21243b, #011073)", borderRadius:'14px', paddingInline:"5px" ,fontSize:"large", fontWeight:"bold", position:'relative',left:"35px"}}> <span style={{color:"gray"}}>You are</span> <span style={{backgroundImage: "linear-gradient(to right, #b8cee3, #29B7E8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textTransform: "capitalize"}}>
  {currentUser.displayName}
</span></span>
        {/* <button onClick={()=>signOut(auth)}>logout</button> */}
      </div>
    </div>

  )
}

export default Navbar