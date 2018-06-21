import React, { Component } from 'react';
import { Form, Text } from 'react-form';
import styles from './styles.css';

class FormWithArrays extends Component {
    static onSubmit(submittedValues) {
        console.log('submittedValues', submittedValues); // eslint-disable-line no-console
        // this.setState({ submittedValues });
    }
    constructor(props) {
        super(props);
        this.state = {};
        // this.onSubmit = this.onSubmit.bind(this);
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-7">
                        <div className={styles.root}>
                            <div className="root">stam</div>
                            <Form onSubmit={FormWithArrays.onSubmit} >
                                {formApi => (
                                    <form onSubmit={formApi.submitForm} id="form3">
                                        <label htmlFor="firstName2">
                                            <Text field="firstName" id="firstName2" />
                                            First name
                                        </label>
                                        <label htmlFor="friend1">
                                            Friend1
                                            <Text field={['friends', 0]} id="friend1" />
                                        </label>
                                        <label htmlFor="friend2">
                                            Friend2
                                            <Text field={['friends', 1]} id="friend2" />
                                        </label>
                                        <label htmlFor="friend3">
                                            Friend3
                                            <Text field={['friends', 2]} id="friend3" />
                                        </label>
                                        <button type="submit" className="mb-4 btn btn-primary">Submit</button>
                                    </form>
                                )}
                            </Form>
                        </div>
                    </div>
                    <div className="col-xs-5">
                        right side
                    </div>
                </div>
            </div>
        );
    }
}

export default FormWithArrays;
