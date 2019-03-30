import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactModal from "./lib/ReactModal";

class App extends Component {
  state = {show:false};
  render() {
    const s = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <button className="btn btn-success"
                  onClick={()=>{this.setState({show:true})}}>Click to open Modal</button>
        </header>
        {s.show &&
          <ReactModal caption="Modal caption"
                      onClose={() => {this.setState({show:false}) }}>Lorem ipsum</ReactModal>
        }
      </div>
    );
  }
}

export default App;
