import React, { Component } from 'react';
import EventList from '../events/events-list';




class EventsPage extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <h1>Event Page</h1>
        <EventList />
      </div>
    );
  }
}

export default EventsPage;