import React, { Component } from 'react'
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend'

class PersonCard extends Component {
    static propTypes = {

    };

    componentDidMount() {
      this.props.connectDragPreview(getEmptyImage());
    }


    render() {
        const {person, style, connectDragSource} = this.props
        return connectDragSource(
            <div style={{width: 200, height: 100, ...style}}>
                <h3 style={{margin: 0, marginBottom: `10px`}}>
                  {person.firstname}&nbsp;{person.lastname}
                </h3>
                <p style={{margin: 0, marginBottom: `10px`}}>
                  {person.email}
                </p>
            </div>
        )
    }
}

const spec = {
  beginDrag(props) {
    return {
      uid: props.person.uid
    }
  },
  endDrag(props, monitor) {
    const personUid = props.person && props.person.uid
    const dropRes = monitor.getDropResult()
    const eventUid = dropRes && dropRes.eventUid

    console.log('---', 'endDrag', personUid, eventUid)
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
})

export default DragSource('person',spec, collect)(PersonCard) 