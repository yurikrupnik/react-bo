import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import './services/socket/client';
import './_styles.scss';


// import('./components/App').then(res => {
//     console.log('res', res);
//
//     render(
//         <res.default
//             userAgent={global.navigator.userAgent}
//             initialState={{}}
//         />, // initialState={global.window.state} for redux
//         global.document.getElementById('root'),
//     );
// });
render(
    <App
        userAgent={global.navigator.userAgent}
        initialState={{}}
    />, // initialState={global.window.state} for redux
    global.document.getElementById('root'),
);

