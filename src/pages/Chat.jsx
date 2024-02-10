import React from 'react'
import Sidebar from '../components/chat/Sidebar'
import Chat from '../components/chat/Chat'
import { useLocation , useNavigate} from 'react-router-dom';
import Header from "../components/Header/Header"

const Home = (props) => {
  const location = useLocation();
  const  id  = location.state || {};
  localStorage.setItem('chatFb',id.fbuid)
  // console.log("Gamer",id.fbuid)
  return (
    <div> <Header/>
    <div className='home'>
     
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
    </div>
  )
}

export default Home