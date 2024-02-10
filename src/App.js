import logo from './logo.svg';
import './App.css';
import Chat from "./pages/Chat.jsx";
import "./style.scss";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Entry/Login.jsx';
import SignUp from './components/Entry/SignUp.jsx';

// import ChatPage from "./components/examples/apps/chat-app/web/react-vite-tailwind/src/pages/chat.js"
import BillBoard from './components/BillBoard/BillBoard.jsx';
import Create from "./components/Sell/Create.jsx"
import Header from './components/Header/Header.jsx';
import Home from './components/Home/home.jsx';
// import PrivateRoute from "./components/examples/apps/chat-app/web/react-vite-tailwind/src/components/PrivateRoute.js";
// import Dashboard from './components/Chat/modules/Dashboard/index.js';
import Alert from './components/Alert.js';
import Item from './components/Items/Item.jsx';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert =(message, type)=>{
    setAlert({
      msg:message,
      type: type            //Alert is an object
    })
    setTimeout(() => {
      setAlert(null)
    }, );
  }

  return (
    <div className="App">
      <Router>
          <div className="containor">
            <Routes>
              <Route path="/chats" element={<Chat/>} />
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/SignUp" element={<SignUp showAlert={showAlert}/>} />
              <Route path="/login" element={<Login showAlert={showAlert}/>} />
              <Route path="/Item" element={<Item showAlert={showAlert}/>} />
              <Route path="/Sell" element={<Create/>} />
              <Route path="/Bill" element={<BillBoard/>} />
            </Routes>
          </div>
        </Router>
    </div>
  );
}

export default App;
