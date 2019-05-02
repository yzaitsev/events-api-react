import React, { Component } from 'react'
import { DragSource } from 'react-dnd';


class PersonCard extends Component {
    static propTypes = {

    };

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
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})

export default DragSource('person',spec, collect)(PersonCard) 