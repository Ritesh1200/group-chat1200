import React from 'react';
import './room.css';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:4000/";
const socket = socketIOClient(ENDPOINT,  {transports: ['websocket']});
socket.on('done' , (message)=>{
   var mes = document.createElement("li");
   mes.innerHTML = message.name +' : ' + message.message ;
   document.getElementById('h1').appendChild(mes);
   scroll();
})

function scroll(){  //automatic scroll down
   var last = document.getElementById('h1').lastElementChild  ;
   last.scrollIntoView();
}

class Room extends React.Component {
   constructor(props){
      super(props);
      this.state = { room: props.match.params.id ,name: props.match.params.name ,message : null,data: null, error: null};
   }
   componentDidMount(){
      
   }
   message = (event)=>{
      this.setState({data : event.target.value});
   }
   
   submit = (event)=>{
      socket.emit('message' , {
         from : this.state.name ,
         message : this.state.data ,
         roomName : this.state.room
      })
      
      event.preventDefault();
   }
   render() {
      return (
         <div className="container-fluid" id='roomback'>
            <div className='row'>
               <div className='col-5'>
               </div>
               <div className="col-7 ">
                  <div class="card" style={{height:'100vh' , }}>
                     <div className= 'card-header'>
                        <h4 style = {{textAlign:'center'}}>{this.state.room}</h4>
                     </div>
                     <div className= 'card-body scroll'>
                        <h4 id = 'h1'> </h4>
                     </div>
                     <div class="card-footer" id='footer'>
                        <form onSubmit={this.submit}>
                        <input type='text' id='input'onChange={this.message} ></input>
                        <button className='btn' type='submit'>Send</button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default Room;