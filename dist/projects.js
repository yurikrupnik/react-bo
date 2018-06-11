exports.ids = ["projects"];
exports.modules = {

/***/ "./api/projects/container.jsx":
/*!************************************!*\
  !*** ./api/projects/container.jsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _config = __webpack_require__(/*! ./config */ "./api/projects/config.js");

var _project = __webpack_require__(/*! ./project */ "./api/projects/project.jsx");

var _project2 = _interopRequireDefault(_project);

var _consumer = __webpack_require__(/*! ../users/consumer */ "./api/users/consumer.jsx");

var _consumer2 = _interopRequireDefault(_consumer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Container extends _react.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // this.props.actions[selector].read();
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('nextProps', nextProps);
        console.log('this.props', this.props);
        console.log('nextState', nextState);
        return true;
    }

    handleChange(event) {
        console.log('this.props', this.props);
        console.log('vent', event.target.value);
    }

    render() {
        // console.log('this.props', this.props);

        // const data = this.props[selector].data;
        // console.log('data', data);

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'h2',
                null,
                'users in projects'
            ),
            _react2.default.createElement(_consumer2.default, null),
            _react2.default.createElement(_project2.default, null)
        );
    }
}

// Container.propTypes = {
//     [selector]: PropTypes.shape({
//         loading: PropTypes.bool.isRequired,
//         selected: PropTypes.shape({}).isRequired,
//         data: PropTypes.shape({}).isRequired // { entities: {}, result: [] }
//     }).isRequired,
//     actions: PropTypes.shape({
//         [selector]: PropTypes.shape({
//             read: PropTypes.func.isRequired,
//             update: PropTypes.func.isRequired,
//             remove: PropTypes.func.isRequired,
//             create: PropTypes.func.isRequired,
//         })
//     }).isRequired
// };

exports.default = Container;

/***/ }),

/***/ "./api/projects/project.jsx":
/*!**********************************!*\
  !*** ./api/projects/project.jsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactForm = __webpack_require__(/*! react-form */ "react-form");

var _projects = __webpack_require__(/*! ./projects.css */ "./api/projects/projects.css");

var _projects2 = _interopRequireDefault(_projects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FormWithArrays extends _react.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-xs-7' },
                    _react2.default.createElement(
                        'div',
                        { className: _projects2.default.root },
                        _react2.default.createElement(
                            'div',
                            { className: 'root' },
                            'stam'
                        ),
                        _react2.default.createElement(
                            _reactForm.Form,
                            {
                                onSubmit: submittedValues => this.setState({ submittedValues }) },
                            formApi => _react2.default.createElement(
                                'form',
                                { onSubmit: formApi.submitForm, id: 'form3' },
                                _react2.default.createElement(
                                    'label',
                                    { htmlFor: 'firstName2' },
                                    'First name'
                                ),
                                _react2.default.createElement(_reactForm.Text, { field: 'firstName', id: 'firstName2' }),
                                _react2.default.createElement(
                                    'label',
                                    { htmlFor: 'friend1' },
                                    'Friend1'
                                ),
                                _react2.default.createElement(_reactForm.Text, { field: ['friends', 0], id: 'friend1' }),
                                _react2.default.createElement(
                                    'label',
                                    { htmlFor: 'friend2' },
                                    'Friend2'
                                ),
                                _react2.default.createElement(_reactForm.Text, { field: ['friends', 1], id: 'friend2' }),
                                _react2.default.createElement(
                                    'label',
                                    { htmlFor: 'friend3' },
                                    'Friend3'
                                ),
                                _react2.default.createElement(_reactForm.Text, { field: ['friends', 2], id: 'friend3' }),
                                _react2.default.createElement(
                                    'button',
                                    { type: 'submit', className: 'mb-4 btn btn-primary' },
                                    'Submit'
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-xs-5' },
                    'right side'
                )
            )
        );
    }
}

exports.default = FormWithArrays;

/***/ }),

/***/ "./api/projects/projects.css":
/*!***********************************!*\
  !*** ./api/projects/projects.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "._3vM9TxKJNPd1qQCs9ZAoJ4 {\n  color: orange; }\n\n._3vM9TxKJNPd1qQCs9ZAoJ4:hover {\n  color: green; }\n\n.blue {\n  color: blue; }\n", ""]);

// exports
exports.locals = {
	"root": "_3vM9TxKJNPd1qQCs9ZAoJ4"
};

/***/ })

};;
//# sourceMappingURL=projects.js.map