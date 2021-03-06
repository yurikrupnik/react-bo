import React, { Component } from 'react';
import { Form, Text } from 'react-form';
import styles from './styles.css';

class FormWithArrays extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(submittedValues) {
        console.log('submittedValues', submittedValues);
        // this.setState({ submittedValues });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-7">
                        <div className={styles.root}>
                            <div className="root">stam</div>
                            <Form onSubmit={this.onSubmit} >
                                {formApi => (
                                    <form onSubmit={formApi.submitForm} id="form3">
                                        <label htmlFor="firstName2">First name</label>
                                        <Text field="firstName" id="firstName2"/>
                                        <label htmlFor="friend1">Friend1</label>
                                        <Text field={['friends', 0]} id="friend1"/>
                                        <label htmlFor="friend2">Friend2</label>
                                        <Text field={['friends', 1]} id="friend2"/>
                                        <label htmlFor="friend3">Friend3</label>
                                        <Text field={['friends', 2]} id="friend3"/>
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
