import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import TextField from 'material-ui/TextField';
// import RaisedButton from 'material-ui/RaisedButton';
// import faker from 'faker';

// import {
    // mapToProps as sessionMapToProps,
    // dispatchActions as sessionActions
// } from '../store/config/session/selectors';
// import socket from '../../services/socket/client';

class Register extends Component {
    // TODO set propTypes and tests - break into smaller parts
    // constructor(props) {
    //     super(props);
    //     this.socket = socket;
    //     this.state = {
    //         form: [
    //             {
    //                 label: '',
    //                 type: 'text',
    //                 name: 'nickname',
    //                 value: '',
    //                 validate: function () {
    //                     return this.value.length;
    //                 },
    //                 errorText: '',
    //                 onChange: this.onChange.bind(this)
    //
    //             }
    //         ]
    //     };
    //
    //     this.onRegister = this.onRegister.bind(this);
    // }
    //
    // onChange(event) {
    //     const { target } = event;
    //     const { name, value } = target;
    //     this.setState(prevState => {
    //         return {
    //             form: prevState.form.map(field => {
    //                 if (field.name === name) {
    //                     field.value = value;
    //                 }
    //                 return field;
    //             })
    //         };
    //     });
    // }
    //
    // onRegister(event) {
    //     event.preventDefault();
    //     const { actions, history } = this.props;
    //     const { session } = actions;
    //     const { setSession } = session;
    //     const { form } = this.state;
    //     const nickname = form[0].value;
    //     const avatar = faker.image.avatar();
    //     const newSession = { nickname, avatar };
    //     this.socket.emit('newUser', newSession, (err) => {
    //         if (!err) {
    //             setSession(newSession);
    //             history.push('/chat');
    //         } else {
    //             this.setState(prevState => {
    //                 return {
    //                     form: prevState.form.map(field => {
    //                         field.errorText = err; // eslint-disable-line no-param-reassign
    //                         field.value = ''; // eslint-disable-line no-param-reassign
    //                         return field;
    //                     })
    //                 }
    //             });
    //         }
    //     });
    // }

    render() {
        // const { form } = this.state;
        // const hasName = form[0].value;
        return (
            <div>registers</div>
        );
    }
}

export default Register;
