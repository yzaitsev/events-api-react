import React, { Component } from 'react'
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { addEventToPerson, peopleListSelector } from '../../ducks/people';

class EventCard extends Component {
    static propTypes = {

    };

    render() {
        const {title, when, where} = this.props.event;
        const { connectDropTarget, canDrop, hovered, people } = this.props;
        const dropStyle = {
            border: `1px solid ${canDrop ? 'red' : 'black'}`,
            // backgroundColor: hovered ? 'green' : 'white'
        }

        const peopleElement = people && (
            <p>
                {people.map(person => person.email).join(', ')}
            </p>
        )

        return connectDropTarget(
            <div style={dropStyle}>
                <h3>{title}</h3>
                <p>{where}, {when}</p>
                 {peopleElement}
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
      props.addEventToPerson(eventUid, personUid)
      
  }
}

function collect(connect, monitor) {
  return {
      connectDropTarget: connect.dropTarget(),
      canDrop: monitor.canDrop(),
      hovered: monitor.isOver()
  }
} 

export default connect( (state, props) => ({
    people: peopleListSelector(state).filter(person => person.events.includes(props.event.uid))
}), { addEventToPerson })(DropTarget('person', spec, collect)(EventCard)) 