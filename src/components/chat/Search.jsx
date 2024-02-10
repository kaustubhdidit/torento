// import React, { useContext, useState,useEffect } from "react";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   setDoc,
//   doc,
//   updateDoc,
//   serverTimestamp,
//   getDoc,
// } from "firebase/firestore";
// import { db } from "../../firebase";
// import { AuthContext } from "../../context/AuthContext";
// const Search = () => {
//   const chatFb=localStorage.getItem('chatFb')
//   const [username, setUsername] = useState(chatFb);
//   const [user, setUser] = useState(null);
//   const [err, setErr] = useState(false);

//   const { currentUser } = useContext(AuthContext);

//   const handleSearch = async () => {
//     const q = query(
//       collection(db, "users"),
//       where("uid", "==", username)
//     );

//     try {
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         setUser(doc.data());
//       });
//       handleSelect();
//     } catch (err) {
//       setErr(true);
//     }
//   };

//   const handleKey = (e) => {
//     e.code === "Enter" && handleSearch();
//   };

  

//   const handleSelect = async () => {
//     //check whether the group(chats in firestore) exists, if not create
//     const combinedId =
//       currentUser.uid > chatFb
//         ? currentUser.uid + chatFb
//         : chatFb + currentUser.uid;
//     try {
//       const res = await getDoc(doc(db, "chats", combinedId));

//       if (!res.exists()) {
//         //create a chat in chats collection
//         await setDoc(doc(db, "chats", combinedId), { messages: [] });

//         //create user chats
//         await updateDoc(doc(db, "userChats", currentUser.uid), {
//           [combinedId + ".userInfo"]: {
//             uid: user.uid,
//             displayName: user.displayName,
//             // photoURL: user.photoURL,
//           },
//           [combinedId + ".date"]: serverTimestamp(),
//         });
//         console.log("biro")
//         console.log(user.uid)
//         await updateDoc(doc(db, "userChats", user.uid), {
          
//           [combinedId + ".userInfo"]: {
//             uid: currentUser.uid,
//             displayName: currentUser.displayName,
//             // photoURL: currentUser.photoURL,
//           },
//           [combinedId + ".date"]: serverTimestamp(),
//         });
//       }
//     } catch (err) {}

//     setUser(null);
//     setUsername("")
//   };
//   useEffect(() => {
//     // Call handleSearch when the component mounts
//     handleSearch();
//   }, []);
//   return (
    
//     <div className="search">
//       <div className="searchForm">
//         <input
//           type="text"
//           placeholder="Find a user"
//           onKeyDown={handleKey}
//           onChange={(e) => setUsername(e.target.value)}
//           value={username}
//         />
//       </div>
//       {err && <span>User not found!</span>}
//       {user && (
//         <div className="userChat" onClick={handleSelect}>
//           <img src={user.photoURL} alt="" />
//           <div className="userChatInfo">
//             <span>{user.displayName}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Search;

import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const Search = () => {
  const chatFb=localStorage.getItem('chatFb')
  const [username, setUsername] = useState(chatFb);
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        // handleSelect();
      });
     
    } catch (err) {
      setErr(true);
    }
   
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {

    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            // photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        // console.log("biro")
        // console.log(user.uid)
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            // photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };

  useEffect(() => {
    // Call handleSearch when the component mounts
    handleSearch();
    if (user !== null) {
      handleSelect();
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="search">
      <div className="searchForm">
        {/* <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        /> */}
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div>
        <span style={{ position:'relative',right:'3cm',fontWeight:'bold',backgroundImage: "linear-gradient(to right, #4FDCE4, #E7BF6A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>Click below to chat with..</span>
        <div className="userChat" onClick={handleSelect}>
         
          {/* <img src={user.photoURL} alt="" /> */}
          <div className="userChatInfo">
        
            <span style={{fontWeight:'bold' , backgroundImage: "linear-gradient(to right, #43CA25, #7AED83)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textTransform: "capitalize"}}>
            {user.displayName}
</span>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Search;
