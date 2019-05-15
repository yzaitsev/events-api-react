import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import {deleteEvent, stateSelector} from '../../ducks/events'
import Loader from '../common/Loader'





class Trash extends Component {



  render() {
    const {connectDropTarget, isOver, loading} = this.props
    const style = {
        border: `1px solid ${isOver ? 'green' : 'black'}`,
        width: 100, height: 100,
        position: 'fixed',
        top: '10px', right: '10px'
    }
    return connectDropTarget(
      <div style={style}>
        Trash
        { loading && <Loader /> }
      </div>
    );
  }
}



const spec = {
  drop(props, monitor) {
    const item = monitor.getItem();
    props.deleteEvent(item.uid)
  }
  
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}


export default connect(state => ({
  loading: stateSelector(state).loading
}),{ deleteEvent })(DropTarget('event', spec, collect)(Trash));