import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './component/views/App';
import Provider from './store/container';
// import 'flexboxgrid';
import './styles.scss';

render(
    (
        <BrowserRouter>
            <Provider>
                <App
                    userAgent={global.navigator.userAgent}
                    initialState={global.window.preloadedState}
                />
            </Provider>
        </BrowserRouter>
    ),
    global.document.getElementById('root'),
);
