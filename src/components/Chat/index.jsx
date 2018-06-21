import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

import socket from '../../services/socket/client';

const CardExampleWithAvatar = props => (
    <Card>
        <CardHeader
            title={props.nickname}
            avatar={props.avatar}
        />
        <CardText>
            {props.message}
        </CardText>
    </Card>
);

CardExampleWithAvatar.propTypes = {
    nickname: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    // className: PropTypes.string
};

class ChatRoom extends Component {
    // TODO set propTypes and tests - break into smaller parts
    constructor(props) {
        super(props);
        this.socket = socket;
        this.state = {
            value: '',
            messages: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.resetValue = this.resetValue.bind(this);
    }

    componentDidMount() {
        const { session, history } = this.props;
        if (!session.nickname) {
            history.push('/register');
        }

        this.socket.on('receiveMessage', (newMessage) => {
            // console.log('actions', actions);
            this.setState(
                prevState => ({ messages: prevState.messages.concat(newMessage) }),
                () => {
                    global.window.scrollBy(0, global.document.getElementsByClassName('list')[0].offsetHeight);
                }
            );
        // or with redux action - has bug - sends 2 messages to the connection of webpack dev server
        // actions.messages.setNewMessage(newMessage);
        });
    }

    handleChange(event) {
        const { target } = event;
        const { value } = target;
        this.setState(() => ({ value }));
    }

    resetValue() {
        this.setState(() => ({ value: '' }));
    }

    handleKeyDown(event) {
        if (event.which === 13) {
            const { value } = this.state;
            this.socket.emit('newMessage', value, this.resetValue);
        }
    }

    render() {
        const { messages, value } = this.state;
        const { session } = this.props;
        return (
            <div style={{ minHeight: '100%' }}>
                <h3 className="header">Chat</h3>
                <div className="list">
                    {messages.map((message, i) => {
                        const a = session.nickname + i;
                        const className = session.nickname === message.nickname ? 'bg-own' : '';
                        return (
                            <CardExampleWithAvatar key={a} className={className} {...message} />
                        );
                    })}
                </div>
                <div className="footer">
                    <TextField
                        fullWidth={false}
                        id="message"
                        value={value}
                        floatingLabelText="Message"
                        onKeyDown={this.handleKeyDown}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        );
    }
}

ChatRoom.propTypes = {
    session: PropTypes.string.isRequired,
    history: PropTypes.shape({}).isRequired,
    actions: PropTypes.shape({}).isRequired
};

export default ChatRoom;
