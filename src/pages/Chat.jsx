import React from 'react'
import Sidebar from '../components/chat/Sidebar'
import Chat from '../components/chat/Chat'
import { useLocation , useNavigate} from 'react-router-dom';
import Header from "../components/Header/Header"
import "./Chat.scss"

const Home = (props) => {
  const location = useLocation();
  const  id  = location.state || {};
  localStorage.setItem('chatFb',id.fbuid)
  // console.log("Gamer",id.fbuid)
  return (
    <div> <Header/>
    <div className='home'>
     
      <div className="container" id='soul'>
        <Sidebar/>
        <Chat/>
      </div>
    </div>
    </div>
  )
}

export default Home

// import React, { useEffect } from 'react';
// import Sidebar from '../components/chat/Sidebar';
// import Chat from '../components/chat/Chat';
// import { useLocation } from 'react-router-dom';
// import Header from '../components/Header/Header';
// import './Chat.scss';

// const Home = () => {
//   const location = useLocation();
//   const id = location.state || {};

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 760) {
//         alert('Screen width is 760px or less!');
//       }
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []); // Empty dependency array to run only once after the component mounts

//   return (
//     <div>
//       <Header />
//       <div className='home'>
//         <div className='container' id='soul'>
//           <Sidebar />
//           <Chat />
//         </div>
        
//       </div>
//       <p id='pseudo' >This section of website is under work, Works on PC</p>
//     </div>
//   );
// };

// export default Home;
