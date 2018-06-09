import React, { Component } from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import { Consumer as ThemesConsumer } from '../contexts/themes';

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
                    console.log('props', props);

                    return (
                        <div>as</div>
                    );
                }}
                />
                <div>
                    <div>
                        <Link to="/">Dashboard1</Link>
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
