import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAll, peopleListSelector } from '../../ducks/people';
import { Column, Table } from 'react-virtualized';


class PeopleList extends Component {

  componentDidMount() {
    this.props.fetchAll()
  }


  rowGetter = ({index}) => this.props.peopleList[index]

  render() {
    const { peopleList } = this.props;
    return (
      <div>
        <h3>Table of people</h3>
        <Table
          headerHeight={50}
          headerStyle={{borderBottom: `1px solid grey`}}
          height={300}
          rowCount={this.props.peopleList.length}
          rowHeight={50}
          width={600}
          rowGetter={this.rowGetter}
          overscanRowCount={2}
        >
        <Column 
          label='First name'
          dataKey='firstname' 
          width={200} 
        />
        <Column 
          label='Last name'
          dataKey='lastname' 
          width={200} 
        />
        <Column 
          label='Email'
          dataKey='email' 
          width={200} 
        />
        </Table>
      </div>
    );
  }
}

export default connect(state => ({
  peopleList: peopleListSelector(state)
}), {fetchAll})(PeopleList);