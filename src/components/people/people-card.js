import React, { Component } from 'react'

class PersonCard extends Component {
    static propTypes = {

    };

    render() {
        const {person, style} = this.props
        return (
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

export default PersonCard 