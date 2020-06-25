import React from 'react';

import { Router } from "@reach/router"
// import ballon from './ballon.svg';
import './App.css';
import  Create from './Create'
import SharedNote from './SharedNote'
import Header from'./header';

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   //this.state = {photos: [],uuid:uuidv4()};  
    
  // }

  render() {
//function App() {
  return (
    <div className="App">
    <Header/>
    <Router>
    <Create path="/" />
    <SharedNote path="Share/:SessionId" />
  </Router>
  </div>

  )
  }
}

export default App;
