// import React, { useContext, useState } from "react";
// import Img from "../../img/ime1.png";
// import Attach from "../../img/attach.png";
// import { AuthContext } from "../../context/AuthContext";
// import { ChatContext } from "../../context/ChatContext";
// import {
//   arrayUnion,
//   doc,
//   serverTimestamp,
//   Timestamp,
//   updateDoc,
// } from "firebase/firestore";
// import { db, storage } from "../../firebase";
// import { v4 as uuid } from "uuid";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// const Input = () => {
//   const [text, setText] = useState("");
//   const [img, setImg] = useState(null);

//   const { currentUser } = useContext(AuthContext);
//   const { data } = useContext(ChatContext);
//   const handleKey = (e) => {
//     e.code === "Enter" && handleSend();
//   };


 
  
//   const handleSend = async () => {
//     if (img) {
//       const storageRef = ref(storage, uuid());
  
//       const uploadTask = uploadBytesResumable(storageRef, img);
  
//       uploadTask.then(async (snapshot) => {
//         console.log("Upload complete");
//         try {
//           const downloadURL = await getDownloadURL(snapshot.ref);
//           console.log("Download URL obtained:", downloadURL);
//           // Proceed with updating Firestore
//           await updateFirestore(downloadURL);
//         } catch (error) {
//           console.error("Error getting download URL:", error);
//           // Handle error getting download URL
//         }
//       }).catch((error) => {
//         console.error("Error uploading image:", error);
//         // Handle error uploading image
//       });
//     } else {
//       // If no image, update Firestore directly
//       await updateFirestore(null);
//     }
//   };
  
  
//   const updateFirestore = async (downloadURL) => {
//     try {
//       // Update Firestore documents
//       const messageData = {
//         id: uuid(),
//         text,
//         senderId: currentUser.uid,
//         date: Timestamp.now(),
//         img: downloadURL, // This may be null if no image
//       };
  
//       await updateDoc(doc(db, "chats", data.chatId), {
//         messages: arrayUnion(messageData),
//       });
  
//       await updateDoc(doc(db, "userChats", currentUser.uid), {
//         [data.chatId + ".lastMessage"]: {
//           text,
//         },
//         [data.chatId + ".date"]: serverTimestamp(),
//       });
  
//       await updateDoc(doc(db, "userChats", data.user.uid), {
//         [data.chatId + ".lastMessage"]: {
//           text,
//         },
//         [data.chatId + ".date"]: serverTimestamp(),
//       });
  
//       // Reset input fields
//       setText("");
//       setImg(null);
//     } catch (error) {
//       // Handle Firestore update error
//       console.error("Error updating Firestore:", error);
//     }
//   };
  
//   return (
//     <div className="input">
//     <input
//   type="text"   
//   placeholder="Type something..."
//   onChange={(e) => setText(e.target.value)}
//   value={text}
//   onKeyDown={(e) => text !== "" && handleKey(e)}
// />

//       <div className="send">
//         {/* <img src={Attach} alt="" /> */}
//         <input
//   type="file"
//   style={{ display: "none" }}
//   id="file"
//   onChange={(e) => setImg(e.target.files[0])}
//   onKeyDown={(e) => img !== null && handleKey(e)}

// />

        
//         <label htmlFor="file">
//           <img  src={Img} alt="" />
//         </label>
//         <button  disabled={text==="" && img===null } onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Input;

import React, { useContext, useState, useEffect } from "react";
import Img from "../../img/ime1.png";
import Attach from "../../img/attach.png";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Enter" && (text!=="" || img!==null)) {
        handleSend();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [text, img]);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
  
      const uploadTask = uploadBytesResumable(storageRef, img);
  
      uploadTask.then(async (snapshot) => {
        console.log("Upload complete");
        try {
          const downloadURL = await getDownloadURL(snapshot.ref);
          console.log("Download URL obtained:", downloadURL);
          // Proceed with updating Firestore
          await updateFirestore(downloadURL);
        } catch (error) {
          console.error("Error getting download URL:", error);
          // Handle error getting download URL
        }
      }).catch((error) => {
        console.error("Error uploading image:", error);
        // Handle error uploading image
      });
    } else {
      // If no image, update Firestore directly
      await updateFirestore(null);
    }
  };
  
  const updateFirestore = async (downloadURL) => {
    try {
      // Update Firestore documents
      const messageData = {
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
        img: downloadURL, // This may be null if no image
      };
  
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion(messageData),
      });
  
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
  
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
  
      // Reset input fields
      setText("");
      setImg(null);
    } catch (error) {
      // Handle Firestore update error
      console.error("Error updating Firestore:", error);
    }
  };
  
  return (
    <div className="input">
    <input
      type="text"   
      placeholder="Type something..."
      onChange={(e) => setText(e.target.value)}
      value={text}
    />

    <div className="send">
      {/* <img src={Attach} alt="" /> */}
      <input
        type="file"
        style={{ display: "none" }}
        id="file"
        onChange={(e) => setImg(e.target.files[0])}
      />
      
      <label htmlFor="file">
        <img  src={Img} alt="" />
      </label>
      <button disabled={text === "" && img === null } onClick={handleSend}>Send</button>
    </div>
  </div>
  );
};

export default Input;
