// import React from 'react';
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './submit-button.css';
import UserConsumer from '../contexts/themes/consumer';

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

function Dashboard(props) {
    return (
        <div>
            <h2>Dashboard</h2>
            <UserConsumer render={()=> {
                return <div>yebal</div>
            }}/>
            <SubmitButton />
        </div>
    );
}

export default Dashboard;
