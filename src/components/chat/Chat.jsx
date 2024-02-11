import React, { useContext } from "react";
import Cam from "../../img/cam.png";
import Add from "../../img/add.png";
import "./Chat.scss"
import More from "../../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from '../../context/AuthContext'
import Header from "../Header/Header";

const Chat = () => {
  const {currentUser} = useContext(AuthContext)
  const { data } = useContext(ChatContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 760);
    };

    handleResize(); // Call the function once to set initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
   {isMobile && <Header />}
    <div className="chat" >
      {data.user?.displayName ? ( // Check if displayName is present
        <>
          <div className="chatInfo" >
            <span style={{backgroundImage: "linear-gradient(to right, #21243b, #011073)", borderRadius:'14px', paddingInline:"5px" , fontSize:"0.7cm", fontWeight:"bold", position:'relative',left:"20px"}}> <span style={{color:'lightgray'}}>Chatting with:</span> &nbsp; <span style={{backgroundImage: "linear-gradient(to right, #b8cee3, #29B7E8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textTransform: "capitalize"}}>
            {data.user.displayName}
            </span></span>
          </div>
          <Messages/>
          <Input/>
        </>
      ):
      (
        <div className="selechat">
         <span className="spanner">Hey <span style={{backgroundImage: "linear-gradient(to right, #b8cee3, #29B7E8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>{currentUser.displayName}</span>,<br /> Select a chat</span>
        </div>
      )
      }
    </div>
    </>
  );
};

export default Chat;
