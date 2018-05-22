import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import withReduxStore from '../HOC/withReduxStore';
// import withSubRoutes from '../HOC/withSubRoutes';
import Material from '../Material';
// import configureStore from '../../store';
import Header from './Header';
// import routes from './routes';
import Provider from '../../store/container';
// const Shit = ({ userAgent, initialState }) => (
//     <Material userAgent={userAgent}>
//         <Provider initState={initialState}>
//             <Header />
//         </Provider>
//     </Material>
// );
// import Chat from './components/App';
import Chat from '../Chat';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { vo: true };
    }

    render() {
        const { vo } = this.state;
        console.log('vo', vo);
        const { userAgent } = this.props;
        // const store = configureStore(initialState);
        // const Root = withReduxStore(withSubRoutes(Header, routes), store);
        return (
            <Material userAgent={userAgent}>
                <Provider initialState={{}}>
                    <Header />
                </Provider>
            </Material>
        );
    }
}
App.propTypes = {
    //     initialState: PropTypes.shape({}).isRequired,
    userAgent: PropTypes.string.isRequired
};

module.exports = App;

// export default App;
