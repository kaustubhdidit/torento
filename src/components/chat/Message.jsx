import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const dateString = message.date.toDate().toLocaleString();

  return (
    <div style={{display:(message.text || message.img)?'':'none'}}>
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
      
    >
      <div className="messageContent">
        <p style={{ display:message.text?'':'none', wordBreak: "break-all", overflowWrap: "break-word" }}>{message.text}</p>
        {message.img && <img src={message.img} alt={data.user.displayName} />}
        <span style={{position:'relative', bottom:'5px', color:'gray', fontStyle:'italic', fontSize:'12px'}}>{dateString}</span>
      </div>
     
    </div>
    
    </div>
  );
};

export default Message;
