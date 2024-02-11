import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";
import "./Chats.scss"

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        // console.log("first")
        // console.log(doc.data())
        // console.log("first")
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    
    <div className="chats">
      <br />
       <span className="ychats"  style={{ fontSize:'0.9cm',fontWeight:'bold',backgroundImage: "linear-gradient(to right, #4FDCE4, #E7BF6A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>Your Chats</span>
       <br />
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo" >
          <span style={{fontWeight:'bold', backgroundImage: "linear-gradient(to right, #E87229, #E8AF29)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textTransform: "capitalize"}}>
          {chat[1].userInfo.displayName}
</span>
            {/* <span>{chat[1].userInfo.displayName}</span> */}
            <p style={{fontWeight:'bold', 
      maxWidth: '325px', 
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'}}>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
