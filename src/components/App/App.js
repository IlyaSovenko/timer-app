import React, { Component } from 'react';

import Timer from '../../containers/Timer/Timer';


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