import React, { Component } from 'react';
import PeopleList from '../people/people-list';
import SelectedEvents from '../events/selected-events';
import EventsTable from '../events/events-table-virtualized';


class AdminPage extends Component {
  
  render() {
    return (
      <div>
        <h1>Admin page</h1>
        <SelectedEvents />
        <PeopleList />
        <EventsTable />      
      </div>
    );
  }
}

export default AdminPage;