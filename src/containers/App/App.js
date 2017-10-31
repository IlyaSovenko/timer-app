import React, { Component } from 'react';

import styles from './App.css';
import Timer from '../../components/Timer/Timer';


class App extends Component {
    render() {
        return (
          <div>

              <Timer/>

              {this.props.children}

          </div>
        );
    }
}



export default App;