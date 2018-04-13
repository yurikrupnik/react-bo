import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './component/views/App';
// import './services/node/socket/client'; // connect to socket client
// import './styles/vars.scss';
// import './styles/custom-styles.scss';
// import 'flexboxgrid'; // load flexbox for grid system

// const App = (props) => {
//     console.log('props', props);
//     return (<div>hello from reacr</div>);
// };

// class App extends Component {
//   render() {
//     return (<div>hello from reacr</div>);
//   }
// }


render(
    (
        <BrowserRouter>
            <App
                userAgent={global.navigator.userAgent}
                initialState={global.window.preloadedState}
            />
        </BrowserRouter>
    ),
    global.document.getElementById('root'),
);
