import React, { Component } from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../routes';
import Nav from './Nav';
class MainNav extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { session: '' };
    // }

    render() {
        // if (this.state.session) {
        //     return (<Redirect to="/register" />);
        // }
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

import { Consumer as ThemesConsumer, Provider as ThemesProvider } from '../contexts/themes';
import { Consumer as UsersConsumer, Provider as UsersProvider } from '../contexts/users';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    // componentDidMount() {
    //     this.fetch();
    // }

    render() {
        // The ThemedButton button inside the ThemeProvider
        // uses the theme from state while the one outside uses
        // the default dark theme
        // const { theme, data, loading } = this.state;
        return (
            <div>
                <ThemesProvider>
                    <Nav />
                    <div>
                        {this.children}
                    </div>
                    {routes.map(route => <Route key={route.key} {...route} />)}
                    <div>default footer</div>
                </ThemesProvider>
            </div>
        );
    }
}

export default App;

// export { Consumer };
