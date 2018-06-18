// import React from 'react';
import React from 'react';
// import classNames from 'classnames/bind';
import './styles.css';
import ThemesConsumer from '../contexts/themes/consumer';
import UsersConsumer from '../../api/users/consumer';
import ProjectsConsumer from '../../api/projects/consumer';
import Form from '../Form';

function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>
            <UsersConsumer />
            <ProjectsConsumer />
            <ThemesConsumer />
            <ThemesConsumer render={() => <div>yebal</div>} />
            <Form />
        </div>
    );
}

export default Dashboard;
