import React, { Component } from 'react';
import { connect } from 'react-redux';

import { uploadFile } from '../../ducks/channel';



class FileChannel extends Component {

  inputFileChange = (event) => this.props.uploadFile(event.target.files)

  render() {
    return (
      <div>
        <input type='file' onChange={this.inputFileChange} />
        <progress max="100" value="25" />
      </div>
    );
  }
}

export default connect(
  null,
  { uploadFile }
)(FileChannel);