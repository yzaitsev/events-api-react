import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moduleName, fetchAll, eventListSelector } from '../../ducks/events';
import Loader from '../common/Loader';

class EventList extends Component {

  componentDidMount() {
    this.props.fetchAll()
  }
  
  render() {
    console.log('---', this.props.events)
    if (this.props.loading) return <Loader/>
    return (
      <div>
        <table>
          <tbody>
            {this.getRows()}
          </tbody>
        </table>
      </div>
    )
}

  getRows = () => {
    return this.props.events.map(this.getRow)
  }

  getRow = (event, index) => {
    return <tr key={index}>
        <td>{event.title}</td>
        <td>{event.where}</td>
        <td>{event.month}</td>
    </tr>
  }
}

export default connect( state => ({
  events: eventListSelector(state),
  loading: state[moduleName].loading
}), {fetchAll})(EventList);