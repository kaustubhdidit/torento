import React, { useContext } from "react";
import Cam from "../../img/cam.png";
import Add from "../../img/add.png";
import More from "../../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  // console.log(data)

  return (
    <div className="chat">
      <div className="chatInfo" >
        <span style={{backgroundImage: "linear-gradient(to right, #21243b, #011073)", borderRadius:'14px', paddingInline:"5px" , fontSize:"large", fontWeight:"bold", position:'relative',left:"20px"}}> <span style={{color:'lightgray'}}>Chatting with:</span> &nbsp; <span style={{backgroundImage: "linear-gradient(to right, #b8cee3, #29B7E8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textTransform: "capitalize"}}>
        {data.user?.displayName}
</span></span>
       
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
