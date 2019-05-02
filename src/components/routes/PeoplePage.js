import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPerson } from '../../ducks/people';
import NewPersonForm from '../people/NewPersonForm';
import PeopleTable from '../people/people-table';



class PeoplePage extends Component {

  
  render() {
    return (
      <div>
        <PeopleTable />
        <br />
        <NewPersonForm onSubmit={ this.props.addPerson } />
      </div>
    );
  }
}

export default connect(null, {
  addPerson
})(PeoplePage);