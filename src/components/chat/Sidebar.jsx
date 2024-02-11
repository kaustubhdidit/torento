// import React from "react";
// import Navbar from "./Navbar"
// import Search from "./Search"
// import Chats from "./Chats"
// import "./Sidebar.scss"
// import Header from "../Header/Header";

// const Sidebar = () => {
//   return (
//     <>
//     if({window.innerWidth <= 760})
//    { <Header/>}
//     <div className="sidebar" >
//       <Search/>
//       <Chats/>
//     </div>
//     </>
//   );
// };

// export default Sidebar;

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import "./Sidebar.scss";
import Header from "../Header/Header";

const Sidebar = () => {
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
      <div className="sidebar">
        <Search />
        <Chats />
      </div>
    </>
  );
};

export default Sidebar;
