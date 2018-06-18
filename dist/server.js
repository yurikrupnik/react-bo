/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// require() chunk loading for javascript
/******/
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("./" + ({"about":"about","dashboard":"dashboard","projects":"projects","register":"register","users":"users"}[chunkId]||chunkId) + ".js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./api/index.js":
/*!**********************!*\
  !*** ./api/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = __webpack_require__(/*! koa-router */ "koa-router");

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaBodyparser = __webpack_require__(/*! koa-bodyparser */ "koa-bodyparser");

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaLogger = __webpack_require__(/*! koa-logger */ "koa-logger");

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _users = __webpack_require__(/*! ./users */ "./api/users/index.js");

var _users2 = _interopRequireDefault(_users);

var _projects = __webpack_require__(/*! ./projects */ "./api/projects/index.js");

var _projects2 = _interopRequireDefault(_projects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const route = new _koaRouter2.default();

route.use((0, _koaLogger2.default)());
route.use((0, _koaBodyparser2.default)());
route.use('/api', _users2.default, _projects2.default);

exports.default = route.routes();

/***/ }),

/***/ "./api/methods.js":
/*!************************!*\
  !*** ./api/methods.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
const response = ctx => res => {
    ctx.body = res;
};

const responseId = ctx => res => {
    ctx.body = res._id; // eslint-disable-line no-underscore-dangle
};

const responseError = ctx => err => {
    ctx.status = 500;
    ctx.body = err;
};

const list = Model => ctx => Model.find({}).then(response(ctx)).catch(responseError(ctx));

const find = Model => ctx => Model.findOne({ _id: ctx.params.id }).then(response(ctx)).catch(responseError(ctx));

const removeOne = Model => ctx => Model.findOneAndRemove({ _id: ctx.params.id }).then(responseId(ctx)).catch(responseError(ctx));

const create = Model => ctx => {
    const user = new Model(ctx.request.body);
    return user.save().then(response(ctx)).catch(responseError(ctx));
};

exports.list = list;
exports.find = find;
exports.removeOne = removeOne;
exports.create = create;
exports.response = response;
exports.responseError = responseError;

/***/ }),

/***/ "./api/projects/api.js":
/*!*****************************!*\
  !*** ./api/projects/api.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _request = __webpack_require__(/*! ../request */ "./api/request.js");

var _request2 = _interopRequireDefault(_request);

var _config = __webpack_require__(/*! ./config */ "./api/projects/config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const projectsApi = {
    fetch: (params, cb) => _request2.default.get(_config.url, { params }).then(res => {
        const { data } = res;
        if (typeof cb === 'function') {
            return cb(data);
        }
        return data;
    })
};

exports.default = projectsApi;

/***/ }),

/***/ "./api/projects/config.js":
/*!********************************!*\
  !*** ./api/projects/config.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
const url = '/projects';
const Provider = 'Projects';
const dbModel = 'Project';
const selector = 'projects';

exports.url = url;
exports.Provider = Provider;
exports.dbModel = dbModel;
exports.selector = selector;

/***/ }),

/***/ "./api/projects/context.js":
/*!*********************************!*\
  !*** ./api/projects/context.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Consumer = exports.Provider = undefined;

var _react = __webpack_require__(/*! react */ "react");

const { Provider, Consumer } = (0, _react.createContext)({
    data: [],
    loading: false,
    selected: {}
});

exports.Provider = Provider;
exports.Consumer = Consumer;

/***/ }),

/***/ "./api/projects/index.js":
/*!*******************************!*\
  !*** ./api/projects/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koaRouter = __webpack_require__(/*! koa-router */ "koa-router");

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _config = __webpack_require__(/*! ./config */ "./api/projects/config.js");

var _model = __webpack_require__(/*! ./model */ "./api/projects/model.js");

var _model2 = _interopRequireDefault(_model);

var _methods = __webpack_require__(/*! ../methods */ "./api/methods.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter2.default();

router.get(_config.url, (0, _methods.list)(_model2.default)); // array
router.get(`${_config.url}/:id`, (0, _methods.find)(_model2.default)); // object
router.post(_config.url, (0, _methods.create)(_model2.default));

router.put(_config.url, ctx => _model2.default.findOneAndUpdate({ _id: ctx.request.body._id }, { name: 'else', email: '', hashPassword: 'ta s' }).then((0, _methods.response)(ctx)).catch((0, _methods.responseError)(ctx)));

router.delete(`${_config.url}/:id`, (0, _methods.removeOne)(_model2.default)); // id

exports.default = router.routes();

/***/ }),

/***/ "./api/projects/model.js":
/*!*******************************!*\
  !*** ./api/projects/model.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = __webpack_require__(/*! ./config */ "./api/projects/config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = new _mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // description: {
    //     type: String,
    //     required: false,
    //     default: ''
    // },
    // context: {
    //     type: Object,
    //     required: true,
    //     default: { settings: {}, profile: [], general: [] }
    // },
    // settings: {
    //     type: Object,
    //     required: true
    // },
    date: {
        type: Date,
        default: Date.now,
        required: false
    }
});

const Model = _mongoose2.default.model(_config.dbModel, schema);
// new Model({
// //     email: 'd@d.com',
//     name: 'project1',
// //     hashPassword: 'sd'
// }).save();

exports.default = Model;
exports.schema = schema;

/***/ }),

/***/ "./api/projects/provider.jsx":
/*!***********************************!*\
  !*** ./api/projects/provider.jsx ***!
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

var _api = __webpack_require__(/*! ./api */ "./api/projects/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProjectsProvider extends _react.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: props.data || [],
            loading: false,
            selected: {}
        };

        this.setSelected = item => {
            this.setState(() => ({ selected: item }));
        };

        this.clearSelected = () => {
            this.setState(() => ({ selected: {} }));
        };

        this.fetch = (params, cb) => {
            return this.setState(prevState => {
                return { loading: !prevState.loading };
            }, () => {
                return _api2.default.fetch(params).then(data => {
                    return this.setState(prevState => {
                        return { data, loading: !prevState.loading };
                    }, cb);
                });
            });
        };
    }

    render() {
        const { loading, data, selected } = this.state;
        return _react2.default.createElement(
            _context.Provider,
            { value: {
                    data,
                    loading,
                    selected,
                    fetch: this.fetch,
                    setSelected: this.setSelected,
                    clearSelected: this.clearSelected
                }
            },
            this.props.children
        );
    }
}

ProjectsProvider.defaultProps = {
    data: []
};

ProjectsProvider.propTypes = {
    children: _propTypes2.default.element.isRequired,
    data: _propTypes2.default.arrayOf(_propTypes2.default.shape({}))
};

exports.default = ProjectsProvider;

/***/ }),

/***/ "./api/request.js":
/*!************************!*\
  !*** ./api/request.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(/*! axios */ "axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _axios2.default.create({ baseURL:  false ? undefined : 'http://localhost:5000/api' });

/***/ }),

/***/ "./api/users/api.js":
/*!**************************!*\
  !*** ./api/users/api.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _request = __webpack_require__(/*! ../request */ "./api/request.js");

var _request2 = _interopRequireDefault(_request);

var _config = __webpack_require__(/*! ./config */ "./api/users/config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersApi = {
    fetch: (params, cb) => _request2.default.get(_config.url, { params }).then(res => {
        const { data } = res;
        if (typeof cb === 'function') {
            return cb(data);
        }
        return data;
    })
};

exports.default = usersApi;

/***/ }),

/***/ "./api/users/config.js":
/*!*****************************!*\
  !*** ./api/users/config.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
const url = '/users';
const Provider = 'Users';
const dbModel = 'User';
const selector = 'users';

exports.url = url;
exports.Provider = Provider;
exports.dbModel = dbModel;
exports.selector = selector;

/***/ }),

/***/ "./api/users/context.jsx":
/*!*******************************!*\
  !*** ./api/users/context.jsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Consumer = exports.Provider = undefined;

var _react = __webpack_require__(/*! react */ "react");

const { Provider, Consumer } = (0, _react.createContext)({
    data: [],
    loading: false,
    selected: {}
});

exports.Provider = Provider;
exports.Consumer = Consumer;

/***/ }),

/***/ "./api/users/index.js":
/*!****************************!*\
  !*** ./api/users/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koaRouter = __webpack_require__(/*! koa-router */ "koa-router");

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _config = __webpack_require__(/*! ./config */ "./api/users/config.js");

var _model = __webpack_require__(/*! ./model */ "./api/users/model.js");

var _model2 = _interopRequireDefault(_model);

var _methods = __webpack_require__(/*! ../methods */ "./api/methods.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter2.default();

router.get(_config.url, (0, _methods.list)(_model2.default)); // array
router.get(`${_config.url}/:id`, (0, _methods.find)(_model2.default)); // object
router.post(_config.url, (0, _methods.create)(_model2.default));

router.put(_config.url, ctx => _model2.default.findOneAndUpdate({ _id: ctx.request.body._id }, { name: 'else', email: '', hashPassword: 'ta s' }) // eslint-disable-line no-underscore-dangle
.then((0, _methods.response)(ctx)).catch((0, _methods.responseError)(ctx)));

router.delete(`${_config.url}/:id`, (0, _methods.removeOne)(_model2.default)); // id

exports.default = router.routes();

/***/ }),

/***/ "./api/users/model.js":
/*!****************************!*\
  !*** ./api/users/model.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserSchema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = __webpack_require__(/*! ./config */ "./api/users/config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserSchema = new _mongoose.Schema({
    // id: {
    //     type: String,
    //     index: true
    // },
    email: { type: String, required: true },
    name: String,
    hashPassword: String
});

const Model = _mongoose2.default.model(_config.dbModel, UserSchema);
// new Model({
//     email: 'd@d.com',
//     name: 'yu',
//     hashPassword: 'sd'
// }).save();

exports.default = Model;
exports.UserSchema = UserSchema;

/***/ }),

/***/ "./api/users/provider.jsx":
/*!********************************!*\
  !*** ./api/users/provider.jsx ***!
  \********************************/
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

var _context = __webpack_require__(/*! ./context */ "./api/users/context.jsx");

var _api = __webpack_require__(/*! ./api */ "./api/users/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersProvider extends _react.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: props.data || [],
            loading: false,
            selected: {}
        };

        this.setSelected = item => {
            this.setState(() => ({ selected: item }));
        };

        this.clearSelected = () => {
            this.setState(() => ({ selected: {} }));
        };

        this.fetch = (params, cb) => {
            return this.setState(prevState => {
                return { loading: !prevState.loading };
            }, () => {
                return _api2.default.fetch(params).then(data => {
                    return this.setState(prevState => {
                        return { data, loading: !prevState.loading };
                    }, cb);
                });
            });
        };
    }

    render() {
        const { loading, data, selected } = this.state;
        return _react2.default.createElement(
            _context.Provider,
            { value: {
                    data,
                    loading,
                    selected,
                    fetch: this.fetch,
                    setSelected: this.setSelected,
                    clearSelected: this.clearSelected
                }
            },
            this.props.children
        );
    }
}

UsersProvider.defaultProps = {
    data: []
};
UsersProvider.propTypes = {
    children: _propTypes2.default.element.isRequired,
    data: _propTypes2.default.arrayOf(_propTypes2.default.shape({}))
};

exports.default = UsersProvider;

/***/ }),

/***/ "./components/App/Nav.jsx":
/*!********************************!*\
  !*** ./components/App/Nav.jsx ***!
  \********************************/
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

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _themes = __webpack_require__(/*! ../contexts/themes */ "./components/contexts/themes/index.jsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Something = props => _react2.default.createElement(
    'div',
    null,
    'hello theme is ',
    props.theme.background
);

Something.propTypes = {
    theme: _propTypes2.default.shape({
        background: _propTypes2.default.string.isRequired
    }).isRequired
};

function MainNav() {
    return _react2.default.createElement(
        'header',
        null,
        _react2.default.createElement(_themes.Consumer, null),
        _react2.default.createElement(_themes.Consumer, { render: props => {
                return _react2.default.createElement(Something, props);
            }
        }),
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/' },
                    'Dashboard'
                )
            ),
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/about' },
                    'About'
                )
            ),
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/topics' },
                    'Topics'
                )
            ),
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/users' },
                    'Users'
                )
            ),
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/projects' },
                    'Pojects'
                )
            ),
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/examples' },
                    'Examples'
                )
            )
        )
    );
}

exports.default = MainNav;

/***/ }),

/***/ "./components/App/index.jsx":
/*!**********************************!*\
  !*** ./components/App/index.jsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _propTypes = __webpack_require__(/*! prop-types */ "prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _routes = __webpack_require__(/*! ../routes */ "./components/routes.js");

var _routes2 = _interopRequireDefault(_routes);

var _Nav = __webpack_require__(/*! ./Nav */ "./components/App/Nav.jsx");

var _Nav2 = _interopRequireDefault(_Nav);

var _provider = __webpack_require__(/*! ../../api/users/provider */ "./api/users/provider.jsx");

var _provider2 = _interopRequireDefault(_provider);

var _provider3 = __webpack_require__(/*! ../../api/projects/provider */ "./api/projects/provider.jsx");

var _provider4 = _interopRequireDefault(_provider3);

var _themes = __webpack_require__(/*! ../contexts/themes */ "./components/contexts/themes/index.jsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const Providers = [ThemesProvider, UsersProvider];

class App extends _react.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            appData: global.window && global.window.appData || {}
        };
        if (global.window) {
            delete global.window.appData;
        }
    }

    render() {
        const { appData } = this.state;
        return _react2.default.createElement(
            _provider4.default,
            { data: appData.Projects },
            _react2.default.createElement(
                _provider2.default,
                { data: appData.Users },
                _react2.default.createElement(
                    _themes.Provider,
                    null,
                    _react2.default.createElement(
                        _react.Fragment,
                        null,
                        _react2.default.createElement(_Nav2.default, null),
                        _routes2.default.map(route => _react2.default.createElement(_reactRouterDom.Route, _extends({ key: route.key }, route))),
                        _react2.default.createElement(
                            'div',
                            null,
                            'default footer'
                        )
                    )
                )
            )
        );
    }
}

exports.default = App;

/***/ }),

/***/ "./components/Examples/container.jsx":
/*!*******************************************!*\
  !*** ./components/Examples/container.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Container extends _react.Component {
    constructor(props) {
        super(props);
        this.state = {
            lo: false
        };
    }

    render() {
        return _react2.default.createElement(
            'div',
            null,
            'hello from container'
        );
    }
}

exports.default = Container;

/***/ }),

/***/ "./components/Loadable/index.jsx":
/*!***************************************!*\
  !*** ./components/Loadable/index.jsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (opts) {
    return (0, _reactLoadable2.default)(Object.assign({
        loading: Loading
        // delay: 200,
        // timeout: 10,
    }, opts));
};

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactLoadable = __webpack_require__(/*! react-loadable */ "react-loadable");

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Loading = props => {
    if (props.error) {
        return _react2.default.createElement(
            'div',
            null,
            'Error! ',
            _react2.default.createElement(
                'button',
                { onClick: props.retry },
                'Retry'
            )
        );
    } else if (props.timedOut) {
        return _react2.default.createElement(
            'div',
            null,
            'Taking a long time... ',
            _react2.default.createElement(
                'button',
                { onClick: props.retry },
                'Retry'
            )
        );
    } else if (props.pastDelay) {
        return _react2.default.createElement(
            'div',
            null,
            'Loading...'
        );
    }
    return null;
};

Loading.defaultProps = {
    error: '',
    pastDelay: '',
    timedOut: '',
    retry: () => {}
};

Loading.propTypes = {
    error: _propTypes2.default.shape({}),
    pastDelay: _propTypes2.default.bool,
    timedOut: _propTypes2.default.bool,
    retry: _propTypes2.default.func
};

/***/ }),

/***/ "./components/Router/index.jsx":
/*!*************************************!*\
  !*** ./components/Router/index.jsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Routes = props => {
    const { children, routes } = props;
    return _react2.default.createElement(
        'div',
        null,
        children,
        routes.map(route => _react2.default.createElement(_reactRouterDom.Route, _extends({ key: route.key }, route)))
    );
};

Routes.defaultProps = {
    children: null
};

Routes.propTypes = {
    children: _propTypes2.default.element,
    routes: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        path: _propTypes2.default.string.isRequired
    })).isRequired
};

exports.default = Routes;

/***/ }),

/***/ "./components/Topics/index.jsx":
/*!*************************************!*\
  !*** ./components/Topics/index.jsx ***!
  \*************************************/
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

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _routes = __webpack_require__(/*! ./routes */ "./components/Topics/routes.jsx");

var _routes2 = _interopRequireDefault(_routes);

var _index = __webpack_require__(/*! ../Router/index */ "./components/Router/index.jsx");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Topics = props => {
    const { match } = props;
    const data = [{
        value: 'props-v-state',
        title: 'Props v. State'
    }, {
        value: 'components',
        title: 'Components'
    }, {
        value: 'rendering',
        title: 'Rendering with React'
    }];
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'h2',
            null,
            'Topics'
        ),
        _react2.default.createElement(
            _index2.default,
            { routes: _routes2.default },
            _react2.default.createElement(
                'ul',
                null,
                data.map(val => _react2.default.createElement(
                    'li',
                    { key: val.value },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: `${match.url}/${val.value}` },
                        val.title
                    )
                ))
            )
        )
    );
};

Topics.propTypes = {
    match: _propTypes2.default.shape({}).isRequired
};

exports.default = Topics;

/***/ }),

/***/ "./components/Topics/routes.jsx":
/*!**************************************!*\
  !*** ./components/Topics/routes.jsx ***!
  \**************************************/
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Redirect } from 'react-router-dom';

const Topic = ({ match }) => _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
        'h3',
        null,
        match.params.topicId
    )
);

Topic.propTypes = {
    match: _propTypes2.default.shape({}).isRequired
};

const routes = [{
    path: '/topics',
    component: () => _react2.default.createElement(
        'h3',
        null,
        'Please select a topic.'
    ),
    // component: () => (<Redirect to="/topics/components" />),
    exact: true,
    key: '/topics/topics'
}, {
    path: '/topics/:topicId',
    component: Topic,
    exact: true,
    key: '/topics/:topics'
}];

exports.default = routes;

/***/ }),

/***/ "./components/contexts/themes/consumer.jsx":
/*!*************************************************!*\
  !*** ./components/contexts/themes/consumer.jsx ***!
  \*************************************************/
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

var _context = __webpack_require__(/*! ./context */ "./components/contexts/themes/context.jsx");

var _defaultButton = __webpack_require__(/*! ./defaultButton */ "./components/contexts/themes/defaultButton.jsx");

var _defaultButton2 = _interopRequireDefault(_defaultButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ThemesConsumer extends _react.Component {
    render() {
        const { render } = this.props;
        return _react2.default.createElement(
            _context.Consumer,
            null,
            props => {
                if (typeof render === 'function') {
                    return render(props);
                }
                return _react2.default.createElement(_defaultButton2.default, props);
            }
        );
    }
}

ThemesConsumer.defaultProps = {
    render: null
};

ThemesConsumer.propTypes = {
    render: _propTypes2.default.func
};

exports.default = ThemesConsumer;

/***/ }),

/***/ "./components/contexts/themes/context.jsx":
/*!************************************************!*\
  !*** ./components/contexts/themes/context.jsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.themes = exports.Consumer = exports.Provider = undefined;

var _react = __webpack_require__(/*! react */ "react");

const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee',
        color: 'red'
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
        color: 'green'
    }
};

const { Provider, Consumer } = (0, _react.createContext)({
    theme: themes.dark,
    toggleTheme: () => {}
});

exports.Provider = Provider;
exports.Consumer = Consumer;
exports.themes = themes;

/***/ }),

/***/ "./components/contexts/themes/defaultButton.jsx":
/*!******************************************************!*\
  !*** ./components/contexts/themes/defaultButton.jsx ***!
  \******************************************************/
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DefaultConsumer = props => {
    const { theme, toggleTheme } = props;
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'button',
            { style: { background: theme.background }, onClick: toggleTheme },
            'clicks'
        )
    );
};

DefaultConsumer.propTypes = {
    theme: _propTypes2.default.shape({}).isRequired,
    toggleTheme: _propTypes2.default.func.isRequired
};

exports.default = DefaultConsumer;

/***/ }),

/***/ "./components/contexts/themes/index.jsx":
/*!**********************************************!*\
  !*** ./components/contexts/themes/index.jsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Provider = exports.Consumer = undefined;

var _provider = __webpack_require__(/*! ./provider */ "./components/contexts/themes/provider.jsx");

var _provider2 = _interopRequireDefault(_provider);

var _consumer = __webpack_require__(/*! ./consumer */ "./components/contexts/themes/consumer.jsx");

var _consumer2 = _interopRequireDefault(_consumer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Consumer = _consumer2.default;
exports.Provider = _provider2.default;

/***/ }),

/***/ "./components/contexts/themes/provider.jsx":
/*!*************************************************!*\
  !*** ./components/contexts/themes/provider.jsx ***!
  \*************************************************/
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

var _context = __webpack_require__(/*! ./context */ "./components/contexts/themes/context.jsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee',
        color: 'red'
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
        color: 'green'
    }
};

class ThemesProvider extends _react.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            theme: themes.light
        };

        this.toggleTheme = () => {
            this.setState(state => ({
                theme: state.theme === themes.dark ? themes.light : themes.dark
            }));
        };
    }

    render() {
        const { theme } = this.state;
        const { children } = this.props;
        return _react2.default.createElement(
            _context.Provider,
            { value: {
                    theme,
                    toggleTheme: this.toggleTheme
                }
            },
            children
        );
    }
}

ThemesProvider.propTypes = {
    children: _propTypes2.default.element.isRequired
};

exports.default = ThemesProvider;

/***/ }),

/***/ "./components/routes.js":
/*!******************************!*\
  !*** ./components/routes.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Loadable = __webpack_require__(/*! ./Loadable */ "./components/Loadable/index.jsx");

var _Loadable2 = _interopRequireDefault(_Loadable);

var _Topics = __webpack_require__(/*! ./Topics */ "./components/Topics/index.jsx");

var _Topics2 = _interopRequireDefault(_Topics);

var _container = __webpack_require__(/*! ./Examples/container */ "./components/Examples/container.jsx");

var _container2 = _interopRequireDefault(_container);

var _api = __webpack_require__(/*! ../api/users/api */ "./api/users/api.js");

var _api2 = _interopRequireDefault(_api);

var _api3 = __webpack_require__(/*! ../api/projects/api */ "./api/projects/api.js");

var _api4 = _interopRequireDefault(_api3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DashboardLoadableComponent = (0, _Loadable2.default)({
    loader: () => __webpack_require__.e(/*! import() | dashboard */ "dashboard").then(function() { var module = __webpack_require__(/*! ./Dashboard */ "./components/Dashboard/index.jsx"); return typeof module === "object" && module && module.__esModule ? module : Object.assign({/* fake namespace object */}, typeof module === "object" && module, { "default": module }); })
});

const RegisterLoadableComponent = (0, _Loadable2.default)({
    loader: () => __webpack_require__.e(/*! import() | register */ "register").then(function() { var module = __webpack_require__(/*! ./Register */ "./components/Register/index.jsx"); return typeof module === "object" && module && module.__esModule ? module : Object.assign({/* fake namespace object */}, typeof module === "object" && module, { "default": module }); })
});

const ProjectsLoadableComponent = (0, _Loadable2.default)({
    loader: () => __webpack_require__.e(/*! import() | projects */ "projects").then(function() { var module = __webpack_require__(/*! ./Projects */ "./components/Projects/index.jsx"); return typeof module === "object" && module && module.__esModule ? module : Object.assign({/* fake namespace object */}, typeof module === "object" && module, { "default": module }); })
});
const UsersLoadableComponent = (0, _Loadable2.default)({
    loader: () => __webpack_require__.e(/*! import() | users */ "users").then(function() { var module = __webpack_require__(/*! ./Users */ "./components/Users/index.jsx"); return typeof module === "object" && module && module.__esModule ? module : Object.assign({/* fake namespace object */}, typeof module === "object" && module, { "default": module }); })
});

const AboutLoadableComponent = (0, _Loadable2.default)({
    loader: () => __webpack_require__.e(/*! import() | about */ "about").then(function() { var module = __webpack_require__(/*! ./About */ "./components/About/index.jsx"); return typeof module === "object" && module && module.__esModule ? module : Object.assign({/* fake namespace object */}, typeof module === "object" && module, { "default": module }); })
});

const routes = [{
    path: '/',
    component: DashboardLoadableComponent,
    exact: true,
    key: 'dashboard',
    fetch: () => Promise.all([_api4.default.fetch(), _api2.default.fetch()]),
    providers: ['Projects', 'Users']
}, {
    path: '/register',
    component: RegisterLoadableComponent,
    key: 'register'
}, {
    path: '/about',
    component: AboutLoadableComponent,
    key: 'about'
}, {
    path: '/topics',
    component: _Topics2.default,
    key: 'topics'
}, {
    path: '/projects',
    component: ProjectsLoadableComponent,
    key: 'projects',
    fetch: () => _api4.default.fetch(),
    providers: ['Projects']
}, {
    path: '/users',
    component: UsersLoadableComponent,
    key: 'users',
    fetch: () => _api2.default.fetch(),
    providers: ['Users']
}, {
    path: '/examples',
    component: _container2.default,
    key: 'examples'
}];

exports.default = routes;

/***/ }),

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const port = process.env.PORT || 5000;
const ip = process.env.IP || '0.0.0.0' || 'localhost';
const host = process.env.WEBSITE_HOSTNAME || `http://${ip}:${port}`;
const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/react-bo';

module.exports = {
    port,
    host,
    databaseUrl
};

/***/ }),

/***/ "./server.jsx":
/*!********************!*\
  !*** ./server.jsx ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _koa = __webpack_require__(/*! koa */ "koa");

var _koa2 = _interopRequireDefault(_koa);

var _koaStatic = __webpack_require__(/*! koa-static */ "koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaRenderView = __webpack_require__(/*! koa-render-view */ "koa-render-view");

var _koaRenderView2 = _interopRequireDefault(_koaRenderView);

var _koaFavicon = __webpack_require__(/*! koa-favicon */ "koa-favicon");

var _koaFavicon2 = _interopRequireDefault(_koaFavicon);

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactLoadable = __webpack_require__(/*! react-loadable */ "react-loadable");

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

var _server = __webpack_require__(/*! react-dom/server */ "react-dom/server");

var _reactRouter = __webpack_require__(/*! react-router */ "react-router");

var _config = __webpack_require__(/*! ./config */ "./config.js");

var _api = __webpack_require__(/*! ./api */ "./api/index.js");

var _api2 = _interopRequireDefault(_api);

var _db = __webpack_require__(/*! ./services/db */ "./services/db/index.js");

var _db2 = _interopRequireDefault(_db);

var _server2 = __webpack_require__(/*! ./services/socket/server */ "./services/socket/server.js");

var _server3 = _interopRequireDefault(_server2);

var _App = __webpack_require__(/*! ./components/App */ "./components/App/index.jsx");

var _App2 = _interopRequireDefault(_App);

var _routes = __webpack_require__(/*! ./components/routes */ "./components/routes.js");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import stats from './react-loadable.json';

const app = new _koa2.default();
const assets = _path2.default.resolve(__dirname, 'assets');

app.use((0, _koaStatic2.default)(assets));
app.use((0, _koaRenderView2.default)(assets, { extension: 'ejs' }));
app.use((0, _koaFavicon2.default)(_path2.default.resolve(assets, 'favicon.ico')));
app.use((0, _db2.default)(_config.databaseUrl));
app.use(_api2.default);

app.use((ctx, next) => {
    const activeRoute = _routes2.default.find(route => (0, _reactRouter.matchPath)(ctx.url, route)) || {};
    const promise = activeRoute.fetch ? activeRoute.fetch() : Promise.resolve([]);

    return promise.then(res => {
        let appData = {};
        if (res.length && Array.isArray(activeRoute.providers)) {
            appData = activeRoute.providers.reduce((acc, nextProvider, i) => {
                acc[nextProvider] = Array.isArray(res[0]) ? res[i] : res;
                return acc;
            }, appData);
        }
        const context = {};
        const modules = {};
        const title = 'my title';
        const html = (0, _server.renderToString)(_react2.default.createElement(
            _reactRouter.StaticRouter,
            {
                location: ctx.url,
                context: context
            },
            _react2.default.createElement(
                _reactLoadable2.default.Capture,
                { report: moduleName => modules.push(moduleName) },
                _react2.default.createElement(_App2.default, null)
            )
        ));
        ctx.state = { title, html, appData };
        return context.url ? ctx.redirect(301, context.url) : ctx.render('index');
    }).catch(err => {
        console.log('err', err.stack); // eslint-disable-line no-console
        return next(err);
    });
});

_reactLoadable2.default.preloadAll().then(() => {
    (0, _server3.default)(app).listen(_config.port, err => {
        if (err) {
            console.log('err', err); // eslint-disable-line no-console
        } else {
            console.log(`running at port: ${_config.port}`); // eslint-disable-line no-console
        }
    });
});

/***/ }),

/***/ "./services/db/index.js":
/*!******************************!*\
  !*** ./services/db/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = url => {
    _mongoose2.default.connect(url);
    const db = _mongoose2.default.connection;
    _mongoose2.default.Promise = global.Promise;
    db.on('error', console.error.bind(console, 'connection error:')); // eslint-disable-line no-console
    db.on('connected', () => {
        // console.log('connected:');
    });
    db.on('open', () => {
        // we're connected!
        // console.log('connected to a');
    });
    db.once('open', () => {
        // we're connected!
        // console.log('connected to b');
    });
    db.once('disconnected', () => {
        // we're connected!
        // console.log('disconnected');
    });
    return (ctx, next) => {
        ctx.db = db;
        return next();
    };
};

/***/ }),

/***/ "./services/socket/server.js":
/*!***********************************!*\
  !*** ./services/socket/server.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = __webpack_require__(/*! http */ "http");

var _http2 = _interopRequireDefault(_http);

var _socket = __webpack_require__(/*! socket.io */ "socket.io");

var _socket2 = _interopRequireDefault(_socket);

var _socket3 = __webpack_require__(/*! socket.io-logger */ "socket.io-logger");

var _socket4 = _interopRequireDefault(_socket3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
    const server = _http2.default.Server(app.callback());
    const io = (0, _socket2.default)(server);
    const users = {}; // list of messages locally saved in the server
    io.use((0, _socket4.default)());
    io.on('connection', socket => {
        socket.on('newMessage', (message, next) => {
            const { nickname, avatar } = socket;
            // send nickname and avatar with the message taken from socket to all messages
            io.emit('receiveMessage', { message, nickname, avatar });
            next();
        });

        socket.on('newUser', (user, next) => {
            if (Object.keys(users).includes(user.nickname)) {
                next('Name already in use');
            } else {
                // set nickname and avatar on socket object to retrieve later
                socket.nickname = user.nickname; // eslint-disable-line no-param-reassign
                socket.avatar = user.avatar; // eslint-disable-line no-param-reassign
                users[user.nickname] = user;
                next(null);
            }
        });

        socket.on('disconnect', reason => {
            // eslint-disable-line no-unused-vars
            delete users[socket.nickname];
        });
    });

    return server;
};

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ "koa-bodyparser":
/*!*********************************!*\
  !*** external "koa-bodyparser" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),

/***/ "koa-favicon":
/*!******************************!*\
  !*** external "koa-favicon" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-favicon");

/***/ }),

/***/ "koa-logger":
/*!*****************************!*\
  !*** external "koa-logger" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-logger");

/***/ }),

/***/ "koa-render-view":
/*!**********************************!*\
  !*** external "koa-render-view" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-render-view");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),

/***/ "koa-static":
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-form":
/*!*****************************!*\
  !*** external "react-form" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-form");

/***/ }),

/***/ "react-loadable":
/*!*********************************!*\
  !*** external "react-loadable" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-loadable");

/***/ }),

/***/ "react-router":
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),

/***/ "socket.io-logger":
/*!***********************************!*\
  !*** external "socket.io-logger" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io-logger");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map