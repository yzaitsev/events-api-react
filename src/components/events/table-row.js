import React, { Component } from 'react';
import { defaultTableRowRenderer } from 'react-virtualized'
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend'


class TableRow extends Component {

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage());
  } 

  render() {
    const { connectDragSource, ...rest } = this.props;
    return connectDragSource(defaultTableRowRenderer(rest))
  }

}

const spec = {
  beginDrag(props) {
    return { uid: props.rowData.uid }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview()
})

export default DragSource('event', spec, collect)(TableRow);