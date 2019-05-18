import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectedEventsSelector } from '../../ducks/events';
import { TransitionMotion, spring } from 'react-motion';
import EventCard from './selected-event-card';

class SelectedEvents extends Component {


  getStyles = () => this.props.selectedEvents
    .map(event => ({
      style: {
        color: 'red',
        opacity: spring(1, {stiffness: 50}),
        
      },
      key: event.uid,
      data: event
    }))


  willLeave = () => {
    console.log(`----- leave`)
    return { opacity: 0, color: 'blue' }
  }

  willEnter = () => {
    console.log(`----entring`);
    return { opacity: 0, color: 'green' }
  }

  render() {
    return (
      <>
      <h3>Selected events list</h3>
        <TransitionMotion
          styles={this.getStyles()}
          willLeave={this.willLeave}
          willEnter={this.willEnter}
        >
        { (interpolated) => 
          <div>
            { interpolated.map( config => (
              <div key={config.key} style={config.style}>
                  <EventCard event={config.data} />
              </div>
            ))} 
          </div> 
        }
        </TransitionMotion>
      </>
    );
  }

}

export default connect(state => ({
  selectedEvents: selectedEventsSelector(state)
}))(SelectedEvents);