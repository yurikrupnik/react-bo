import React from 'react';
import { Redirect } from 'react-router-dom';

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
);

const routes = [
    {
        path: '/topics',
        // component: () => (<h3>Please select a topic.</h3>),
        component: () => (<Redirect to="/topics/components" />),
        exact: true,
        key: '/topics/topics'
    },
    {
        path: '/topics/:topicId',
        component: Topic,
        exact: true,
        key: '/topics/:topics'
    }
];

export default routes;
