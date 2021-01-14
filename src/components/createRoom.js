import React from 'react';
import './createRoom.css'
import { Redirect } from 'react-router';

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = { room: null ,name: null , error: null};
    }
    idState = (event)=>{
        this.setState({room: event.target.value});
    }
    nameState = (event)=>{
        this.setState({name: event.target.value});
    }
    submit = (event)=>{
        if(this.state.room === null || this.state.name === null){
            document.getElementById('err').innerHTML= 'Enter details'
       }
       else{
        fetch('/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(this.state)
        }).then(res => res.json())
        .then(data => {
            this.setState({error: data.error});
        })
        .catch(() => console.log("Can’t access  response. Blocked by browser?" ))

       }
        
        event.preventDefault();
    }
    error(){
        if(this.state.error === 'yes'){
            document.getElementById('err').innerHTML= 'Room is taken'
        }
        if(this.state.error === 'no'){
        return <Redirect to={`/room/${this.state.room}/${this.state.name}`} />
        }
    }
   render() {
      return (
          <div className="container-fluid " id= 'back'>
             <div className="row">
              <div className="col-md-3 center">
                  <form onSubmit={this.submit}>
                      <div className="form-group">
                          <label for="exampleInputEmail1">Room ID</label>
                          <input type="text" className="form-control" onChange={this.idState}  />
                      </div>
                      <div class="form-group">
                          <label for="exampleInputPassword1">Your Name</label>
                          <input type="text" name="name" className="form-control" onChange={this.nameState} />
                      </div>
                      <h5 id='err' style = {{color: 'red'}}>{this.error()}</h5>
                      <button type="submit"  className="btn btn-primary">Create</button>
                  </form>
              </div>
              </div>
          </div>
  
  
      );
  }
}
export default Create ;