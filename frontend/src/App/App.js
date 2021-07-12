import React, { Component } from 'react';
import Authorized from '../Authorized/Authorized';
import Login from '../Login/Login';
import './App.css';

class App extends Component {
  state = {
    token: undefined
  };

  handleLoggedOut = () => {
    this.setState({ token: undefined });
  };

  handleLoggedIn = (jwt) => {
    this.setState({ token: jwt });
  }

  render() {
    const { token } = this.state;
    return (
      <div className="App">
          { token 
            ? ( <Authorized token={token} onLoggedOut={this.handleLoggedOut} /> ) 
            : ( <Login onLoggedIn={this.handleLoggedIn} /> )
          }
      </div>
    );
  }
}

export default App;
