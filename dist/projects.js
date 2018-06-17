exports.ids = ["projects"];
exports.modules = {

/***/ "./api/projects/consumer.jsx":
/*!***********************************!*\
  !*** ./api/projects/consumer.jsx ***!
  \***********************************/
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

var _context = __webpack_require__(/*! ./context */ "./api/projects/context.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DefaultConsumer = props => {
    const { loading, data } = props;

    return _react2.default.createElement(
        'div',
        null,
        data.map(val => {
            return _react2.default.createElement(
                'div',
                { key: val._id },
                _react2.default.createElement(
                    'h2',
                    null,
                    'users defauly consumer'
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    'name: ',
                    val.name
                )
            );
        })
    );
};

DefaultConsumer.propTypes = {
    loading: _propTypes2.default.bool.isRequired,
    data: _propTypes2.default.arrayOf().isRequired
};

class ProjectsConsumer extends _react.Component {
    render() {
        const { render } = this.props;
        return _react2.default.createElement(
            _context.Consumer,
            null,
            props => {
                if (typeof render === 'function') {
                    return render(props);
                }
                return _react2.default.createElement(DefaultConsumer, props);
            }
        );
    }
}

ProjectsConsumer.defaultProps = {
    render: null
};

ProjectsConsumer.propTypes = {
    render: _propTypes2.default.func
};

exports.default = ProjectsConsumer;

/***/ }),

/***/ "./components/Projects/index.jsx":
/*!***************************************!*\
  !*** ./components/Projects/index.jsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _consumer = __webpack_require__(/*! ../../api/projects/consumer */ "./api/projects/consumer.jsx");

var _consumer2 = _interopRequireDefault(_consumer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SemiContainer extends _react.Component {
    componentDidMount() {
        this.props.fetch();
    }
    render() {
        const { data, loading } = this.props;
        return _react2.default.createElement(
            'div',
            null,
            loading ? _react2.default.createElement(
                'div',
                { style: { background: 'red' } },
                'loading...'
            ) : data.map(v => {
                return _react2.default.createElement(
                    'div',
                    { key: v._id },
                    _react2.default.createElement(
                        'div',
                        null,
                        'name: ',
                        v.name
                    )
                );
            })
        );
    }
}

class Container extends _react.Component {
    render() {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'h2',
                null,
                'Projects'
            ),
            _react2.default.createElement(_consumer2.default, { render: props => {
                    return _react2.default.createElement(SemiContainer, props);
                }
            })
        );
    }
}

exports.default = Container;

/***/ })

};;
//# sourceMappingURL=projects.js.map