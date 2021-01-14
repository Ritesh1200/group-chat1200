import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Home from './components/home';
import JoinRoom from './components/joinRoom' ;
import CreateRoom from './components/createRoom' ;
import Room from './components/room' ;
import '../node_modules/bootstrap/dist/css/bootstrap.min.css' // importing bootstrap
// import './App.css'

function App() {
  return (
    <div >
      <Router>
        <Route exact path='/' component={Home}></Route>
        <Route exact path = '/joinRoom' component= {JoinRoom}></Route>
        <Route exact path = '/createRoom' component= {CreateRoom}></Route>
        <Route exact path = '/room/:id/:name' component= {Room}></Route>
      </Router>
    </div>
  );
}

export default App;
