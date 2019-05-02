import React, { Component } from 'react'
import { DropTarget } from 'react-dnd';

class EventCard extends Component {
    static propTypes = {

    };

    render() {
        const {title, when, where} = this.props.event;
        const { connectDropTarget, canDrop, hovered } = this.props;
        const dropStyle = {
            border: `1px solid ${canDrop ? 'red' : 'black'}`,
            backgroundColor: hovered ? 'green' : 'white'
        }
        return connectDropTarget(
            <div style={dropStyle}>
                <h3>{title}</h3>
                <p>{where}, {when}</p>
            </div>
        )
    }
}


const spec = {
  drop(props, monitor, component) {
      const personUid = monitor.getItem().uid;
      const eventUid = props.event.uid;

      console.log(`---- personUid: `, personUid);
      console.log(`---- eventUid: `, eventUid);
  }
}

function collect(connect, monitor) {
  return {
      connectDropTarget: connect.dropTarget(),
      canDrop: monitor.canDrop(),
      hovered: monitor.isOver()
  }
} 

export default DropTarget('person', spec, collect)(EventCard) 