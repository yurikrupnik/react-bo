exports.ids = ["register"];
exports.modules = {

/***/ "./components/Register/index.jsx":
/*!***************************************!*\
  !*** ./components/Register/index.jsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _client = __webpack_require__(/*! ../../services/socket/client */ "./services/socket/client.js");

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Register extends _react.Component {
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
        return _react2.default.createElement(
            'div',
            null,
            'registers'
        );
    }
}
// import PropTypes from 'prop-types';
// import TextField from 'material-ui/TextField';
// import RaisedButton from 'material-ui/RaisedButton';
// import faker from 'faker';

// import {
// mapToProps as sessionMapToProps,
// dispatchActions as sessionActions
// } from '../store/config/session/selectors';
exports.default = Register;

/***/ }),

/***/ "./services/socket/client.js":
/*!***********************************!*\
  !*** ./services/socket/client.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _socket = __webpack_require__(/*! socket.io-client */ "socket.io-client");

var _socket2 = _interopRequireDefault(_socket);

var _config = __webpack_require__(/*! ../../config */ "./config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _socket2.default.connect(_config.host, { reconnect: true });

/***/ })

};;
//# sourceMappingURL=register.js.map