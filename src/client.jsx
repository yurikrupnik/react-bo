import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import './services/socket/client';
import './_styles.scss';

render(
    <App
        userAgent={global.navigator.userAgent}
        initialState={{}}
    />, // initialState={global.window.state} for redux
    global.document.getElementById('root'),
);

