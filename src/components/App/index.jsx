import React, { Component, createContext } from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Provider from '../../store/container';
import request from 'axios';
import Router from '../Router';
import routes from '../routes';

const apiCall = request.create({
    baseURL: 'http://localhost:5001/',
});

const usersApi = {
    read: (params, cb) => apiCall.get('/api/users', { params })
        .then((res) => {
            const { data } = res;
            if (typeof cb === 'function') {
                return cb(data);
            }
            return data;
        })
};

const projectsApi = {
    read: (params, cb) => apiCall.get('/api/projects', { params })
        .then((res) => {
            const { data } = res;
            if (typeof cb === 'function') {
                return cb(data);
            }
            return data;
        })
};
// const { Provider, Consumer } = createContext({
//     session: '',
//     number: 10
// });

// const App = props => (
//     <Router routes={routes} {...props} />
// );

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


// class AppProvider extends Component {
//     // state = {
//     //     num: 12
//     // };
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             number: 12,
//             yebal: 1
//         };
//     }
//
//     render() {
//         return (
//             <Provider value={this.state}>
//                 <MainNav/>
//             </Provider>
//         );
//     }
// }

import { Consumer as ThemesConsumer, Provider as ThemesProvider } from '../contexts/themes';
// import ThemedButton from '../contexts/themes/themed-button';

// An intermediate component that uses the ThemedButton
function Toolbar(props) {
    return (
        <ThemedButton onClick={props.changeTheme}>
            Change Theme
        </ThemedButton>
    );
}

function Lol(props) {
    return (
        <div>
            <h2>hgello</h2>
            <div>
                <ThemesConsumer />
            </div>
        </div>
    )
}

class App extends React.Component {
    constructor(props, context) {
        console.log('context', context);

        super(props, context);
        // const r = {
        //     light: {
        //         foreground: '#000000',
        //         background: '#eeeeee',
        //     },
        //     dark: {
        //         foreground: '#ffffff',
        //         background: '#222222',
        //     }
        // };

        // const themes = {
        //     light: {
        //         foreground: '#000000',
        //         background: '#eeeeee',
        //         color: 'red'
        //     },
        //     dark: {
        //         foreground: '#ffffff',
        //         background: '#222222',
        //         color: 'green'
        //     },
        // };
        //
        // this.state = {
        //     theme: themes.light,
        //     data: [],
        //     loading: false
        // };
        // //
        // this.toggleTheme = () => {
        //     this.setState(state => ({
        //         theme:
        //             state.theme === themes.dark
        //                 ? themes.light
        //                 : themes.dark,
        //     }));
        // };
        //
        // this.fetch = (params, cb) => {
        //     return usersApi.read(params).then((res) => {
        //         console.log('res', res);
        //         this.setState(() => {
        //             return {
        //                 data: res
        //             };
        //         }, cb);
        //     });
        // };
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
                   <ThemesConsumer />
                   <ThemesConsumer render={() => {
                       return (
                           <div>as</div>
                       )
                   }} />
                   {this.children}
                   {routes.map(route => <Route key={route.key} {...route} />)}
               </ThemesProvider>
            </div>
        );
    }
}

export default App;

// export { Consumer };
