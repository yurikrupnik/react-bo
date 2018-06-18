import React from 'react';
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
            <ThemesConsumer>
                <div>hello from theme consumer children</div>
            </ThemesConsumer>
            <ThemesConsumer />
            <ThemesConsumer render={() => <div>nuuuu</div>} />
            <Form />
        </div>
    );
}

export default Dashboard;
