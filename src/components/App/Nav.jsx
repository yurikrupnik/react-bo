import React, { Component } from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import { Consumer as ThemesConsumer } from '../contexts/themes';
import UserConsumer from '../../api/users/consumer';


const Something = (props) => {
    console.log('props', props);
    return (
        <div>hello theme is {props.theme.background}</div>
    )
};


class MainNav extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { session: '' };
    // }

    render() {

        return (
            <header>
                <ThemesConsumer />

                <ThemesConsumer render={(props) => {
                    return (
                        <Something {...props} />
                    );
                }}
                />
                <div>
                    <div>
                        <Link to="/">Dashboard</Link>
                    </div>
                    <div>
                        <Link to="/about">About</Link>
                    </div>
                    <div>
                        <Link to="/topics">Topics</Link>
                    </div>
                    <div>
                        <Link to="/users">Users</Link>
                    </div>
                    <div>
                        <Link to="/projects">Pojects</Link>
                    </div>
                </div>
            </header>
        );
    }
}

export default MainNav;
