import React, { Component } from 'react';
import BTNChannel from '../channel/btn-channel';
import FileChannel from '../channel/file-channel';


class ChannelPage extends Component {
  render() {
    return (
      <div>
        <BTNChannel />
        <h2>Progress bar channel</h2>
        <FileChannel />
      </div>
    );
  }
}

export default ChannelPage;