import React, { Component } from 'react';
import { connect } from 'react-redux';
import {timeoutRun, timeoutCancel} from '../../ducks/channel';



class BTNChannel extends Component {


  render() {
    return (
      <div>
        <button onClick={ () => this.props.timeoutRun() }>Run channel</button>
        <button onClick={ () => this.props.timeoutCancel() }>Stop channel</button>
      </div>
    );
  }
}

export default connect(
  null, 
  ({ timeoutRun, timeoutCancel }))
(BTNChannel);