import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import withReduxStore from '../HOC/withReduxStore';
// import withSubRoutes from '../HOC/withSubRoutes';
// import Material from '../Material';
// import configureStore from '../../store';
// import Header from './Header';
// import routes from './routes';
// import Provider from '../../store/container';
// const Shit = ({ userAgent, initialState }) => (
//     <Material userAgent={userAgent}>
//         <Provider initState={initialState}>
//             <Header />
//         </Provider>
//     </Material>
// );

class App extends Component {
    // static propTypes = {
    //     initialState: PropTypes.shape({}).isRequired,
    //     userAgent: PropTypes.string.isRequired
    // };

    constructor(props) {
        super(props);
        this.state = { vo: true };
    }

    render() {
        const { vo } = this.state;
        console.log('vo', vo);
        // const { initialState, userAgent } = this.props;
        // const store = configureStore(initialState);
        // const Root = withReduxStore(withSubRoutes(Header, routes), store);
        return (
            <div>hello from app</div>
        );
    }
}

export default App;
