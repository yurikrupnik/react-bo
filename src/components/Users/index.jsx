import React, { Component } from 'react';
import UsersConsumer from '../../api/users/consumer';
import List from '../List';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h2>Users</h2>
                <UsersConsumer render={props => <List {...props} />} />
            </div>
        );
    }
}

export default Container;
