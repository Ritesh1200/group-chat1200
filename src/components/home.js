import React from 'react'
import './home.css'

class Home extends React.Component {
   render() {
      return (
         <div class='container-fluid background'   >
            <div class='row' >
               <div class='col' >
               </div>
               <div class='col button'  >
                  <div className='message' >
                     Join Room
                  </div>
                  <a href="./joinRoom">
                     <span class="span-link"></span>
                  </a>
               </div>
               <div class='col' >
               </div>
               <div class='col button'  >
                  <div className='message'>
                     Create Room
                  </div>
                  <a href="./createRoom">
                     <span class="span-link"></span>
                  </a>
               </div>
               <div class='col'>
               </div>
            </div>
         </div>
      );
   }
}
export default Home; 
