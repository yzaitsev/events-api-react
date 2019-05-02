import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'react-virtualized';
import { fetchAll, peopleListSelector } from '../../ducks/people';
import PeopleCard from './people-card';



class PeopleList extends Component {
  
  componentDidMount() {
    this.props.fetchAll && this.props.fetchAll();
  }

  rowRender = (data) => {
    return <PeopleCard key={data.key} person={this.props.peopleList[data.index]} style={data.style} />
  }


  render() {
    const { peopleList } = this.props;

    return (
      <div>
        <h3>People List</h3>
        <List
          height={210}
          width={200}
          rowCount={peopleList.length}
          rowHeight={70}
          rowRenderer={this.rowRender}	
        >
        </List>
        <hr />
      </div>
    );
  }
}




export default connect(state => ({
  peopleList: peopleListSelector(state)
}), { fetchAll })(PeopleList);