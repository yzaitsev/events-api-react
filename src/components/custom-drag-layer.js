import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';

import PersonPreview from './people/person-card-drag-preview';
import EventPreview from './events/event-drag-preview';

const previewMap = {
  person: PersonPreview,
  event: EventPreview
}


const layerStyle = {
  position: 'fixed',
  pointerEvents: 'none',
  left: `5px`,
  top: `5px`,
  bottom: `5px`,
  right: `5px`,
  width: '50%',
  height: '50%',
  zIndex: 10000,
  border: `2px dashed green`
}


class CustomDragLayer extends Component {

  getItem = () => {
    const { item, itemType, offset } = this.props;
    const PreviewComponent = previewMap[itemType]

    if (!offset || !PreviewComponent)  return null;

    const {x , y} = offset;
    const transformStyle = {transform: `translate(${x}px, ${y}px)`};

    return <div style={transformStyle}><PreviewComponent {...item} /></div>
  }


  render() {
    const { isDragging } = this.props;
    if (!isDragging) return null;

    const item = this.getItem()

    return (
      <div style={layerStyle}>
        { item }
      </div>
    );
  }
}




function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    offset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }
}



export default DragLayer(collect)(CustomDragLayer);