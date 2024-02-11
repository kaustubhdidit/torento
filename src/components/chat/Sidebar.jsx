import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"
import "./Sidebar.scss"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Search/>
      <Chats/>
    </div>
  );
};

export default Sidebar;
