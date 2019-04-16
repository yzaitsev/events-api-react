import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moduleName, fetchAll, eventListSelector } from '../../ducks/events';
import Loader from '../common/Loader';

export class EventList extends Component {

  componentDidMount() {
    this.props.fetchAll()
  }
  
  render() {
    console.log('---', this.props)
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

  handleRowClick = (uid) => () => {
    const {selectEvent} = this.props
    selectEvent && selectEvent(uid)
  }

  getRows = () => {
    return this.props.events.map(this.getRow)
  }

  getRow = (event) => {
    return <tr key={event.uid} className="test--event-list__row" onClick={this.handleRowClick(event.uid)}>
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