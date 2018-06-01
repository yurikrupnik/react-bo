import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import './_styles.scss';

render(
    <App
        userAgent={global.navigator.userAgent}
        initialState={{}}
    />,
    global.document.getElementById('root'),
);

