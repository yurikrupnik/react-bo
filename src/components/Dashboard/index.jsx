// import React from 'react';
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './submit-button.css';
import ThemesConsumer from '../contexts/themes/consumer';
import UsersConsumer from '../../api/users/consumer';
import ProjectsConsumer from '../../api/projects/consumer';

const cx = classNames.bind(styles);

class SubmitButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                valid: false
            },
            store: {
                submissionInProgress: true,
                errorOccurred: false
            }
        };
    }

    render() {
        const text = this.state.store.submissionInProgress ? 'Processing...' : 'Submit';
        const className = cx({
            base: true,
            inProgress: this.state.store.submissionInProgress,
            error: this.state.store.errorOccurred,
            disabled: this.state.form.valid,
        });

        // const classNames = {
        //     base:
        // };

        return <button className={className}>{text}</button>;
    }
}

class SemiContainer extends Component {
    componentDidMount() {
        this.props.fetch();
    }
    render() {
        const { data, loading } = this.props;
        return (
            <div>
                {loading ? <div style={{ background: 'red' }}>loading...</div> : data.map((v) => {
                    return (
                        <div key={v._id}>
                            <div>name: {v.name}</div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

function Dashboard(props) {
    return (
        <div>
            <UsersConsumer render={(props) => {
                return <SemiContainer {...props} />;
            }} />
            <ProjectsConsumer render={(props) => {
                return <SemiContainer {...props} />;
            }}/>
            <h2>Dashboard</h2>
            <ThemesConsumer />
            <ThemesConsumer render={()=> {
                return <div>yebal</div>
            }} />
            <SubmitButton />
        </div>
    );
}

export default Dashboard;
