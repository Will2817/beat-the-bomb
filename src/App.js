import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Text from 'material-ui/Text';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar>
          <Toolbar>
            <Text type="title" colorInherit>Beat the Bomb</Text>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default App;
