import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectedEventsSelector } from '../../ducks/events';

import EventCard from './selected-event-card';

class SelectedEvents extends Component {

  render() {
    return (
      <div>
        <h3>Selected events list</h3>
        {
          this.props.selectedEvents.map(event => <EventCard key={event.uid} event={event}/>)
        }
        <hr />
      </div>
    );
  }
}

export default connect(state => ({
  selectedEvents: selectedEventsSelector(state)
}))(SelectedEvents);