import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Entry/Login.jsx';
import SignUp from './components/Entry/SignUp.jsx';
import BillBoard from './components/BillBoard/BillBoard.jsx';
import Create from "./components/Sell/Create.jsx"
import Header from './components/Header/Header.jsx';
import Home from './components/Home/home.jsx';
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
    }, 3000);
  }

  return (
    <div className="App">
      <Router>
          <div className="containor">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/SignUp" element={<SignUp showAlert={showAlert}/>} />
              <Route path="/login" element={<Login showAlert={showAlert}/>} />
              <Route path="/Item" element={<Item showAlert={showAlert}/>} />
              <Route path="/Sell" element={localStorage.getItem('token')?<Create showAlert={showAlert}/>:<Login/>} />
              <Route path="/Bill" element={localStorage.getItem('token')?<BillBoard showAlert={showAlert}/>:<Login/>} />
            </Routes>
          </div>
        </Router>
    </div>
  );
}

export default App;
