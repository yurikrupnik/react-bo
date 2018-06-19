import React, { Component, Fragment } from 'react';
import img from '../../assets/IF-pin1.png';
import { Provider } from 'react-redux';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

// it is js, many things will work
// many ppl will write posts and articles telling you they have the solution for u
// npm is full with bad packages - need to choose wisely
// u are not in client but in node, https://nodejs.org/api/globals.html
// forget about jquery - different thinking = different patterns
// it is all about scopes...

const data = [
    {
        name: 'asd'
    },
    {
        name: 'dfgh'
    }
];

const getName = v => v.name;

const names = data.map(v => v.name);
const names1 = data.map(v => v.name);

const getData = v => v.data;
Promise.resolve({}).then(getData);
Promise.resolve({ status: 200, data: [] }).then(res => {
    const { status } = res; // do with it something
    console.log('status', status);
    return getData(res);
});

// regular func - no lifecycle and no state - dumb = PureComponent = stateless
// same thing with state and lifecycle - smart = Component = statefull?
// usually used for ui components: styled components - can be changed by props
// buttons and alot more = ui material is a great example https://material-ui.com/api/button/
// dropdown that can have his own inner state either open or closed
// limitations - always in a container, you will not put as main route a dropdown or button
// need to pass many props and define/learn api
// good side - written once and used as new instance provides full control by the class
// most components used by libs use almost the same props
// object oriented combined with functional patten - u can do what ever u want - full power of js
function StateAndToggle(props) {
    const { state, toggle } = props;
    return (
        <div>
            <div>state: {state.toString()}</div>
            <button onClick={toggle}>toggle</button>
        </div>
    );
}

function DumbComponent() {
    return (
        <div>
            <h4>I am dumb component that has simple h2</h4>
        </div>
    );
}

// wrapper component that renders children
// usually used to wrap some logic with lifecycle events or to store data
// limitations - pass state/props to children
// using state here is useless
// use it rarely
// example - redux Provider https://github.com/reduxjs/react-redux/blob/master/docs/api.md#provider-store
class WrapperOfSomeKind extends Component {
    componentDidMount() {
        console.log('this.props of WrapperOfSomeKind in componentDidMount', this.props);
    }

    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

// HOC
// function that returns new react component
// used to close logic in the react component and reuse with any Component that passed to the Hoc as Wrapper
// used when not knowing about render props
// limitations:
// what is your props? the params or this.props?
// if it is params use regular function or react Component from the first example
// Wrapper must be ready to revieve calculated data if any
// user (developer) asks him self what is the data structure returned by the component
// many hocs can bring to name colitions - naming should be withXPostionYPostion :)
// calling in jsx = omg why would i do that, but u want static = creates chain of hocs as pattern
function WithNothing(Wrapper, params) {
    // if this area is not used by any of the 2 parameters currently apear = react should not be inside
    // this area is a closure that never in use - can wrap in 10 functions and have the same effect
    return class extends Component {
        render() {
            return <Wrapper />;
        }
    };
}

function fuHoc(params) {
    return function (Wrapper) {
        return class extends Component {
            render() {
                return (
                    <Wrapper {...params} />
                );
            }
        };
    };
}

function WithStateAndToggle(Wrapper) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isOpen: false
            };
            this.toggle = this.toggle.bind(this);
        }

        toggle() {
            this.setState(prevState => ({ isOpen: !prevState.isOpen }));
        }

        render() {
            return <Wrapper {...this.props} state={this.state.isOpen} toggle={this.toggle} />;
        }
    };
}

// render prop
// the solution to dynamic component (HOC Wrapper) recieving specific props by the wrapper Component
// use cases very dynamic and powerful - the perfect container
// advanced example context api
class RenderPropStateAndToggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }

    render() {
        const { render } = this.props;
        return render({
            isOpen: this.state.isOpen,
            toggle: this.toggle,
        });
    }
}

function FuHocWrapper(props) {
    return (
        <div>
            <h2>Age is: {props.age}</h2>
        </div>
    );
}

function FuRenderProps(props) {
    const age = props.age || 18;
    return props.render({ age });
}

class Container extends Component {
    render() {
        const HocInRender = WithNothing(DumbComponent);
        const WithStateAndToggleReady = WithStateAndToggle(StateAndToggle);
        const FuHocC = fuHoc({ age: 21 })(FuHocWrapper);
        return (
            <Fragment>
                <h1>hello from container</h1>
                <HocInRender />
                <WrapperOfSomeKind children={<DumbComponent />} />
                <WrapperOfSomeKind>
                    <DumbComponent />
                </WrapperOfSomeKind>

                <h3>Hoc of State And Toggle</h3>
                <WithStateAndToggleReady />

                <h3>Render Prop State and Toggle</h3>
                <RenderPropStateAndToggle render={(props) => {
                    return <StateAndToggle state={props.isOpen} toggle={props.toggle} />;
                }}
                />
                <FuHocC />
                <FuRenderProps age={12} render={(props) => {
                    return <FuHocWrapper age={props.age} />
                }}
                />
                <img src={img} alt="no imgag" />
            </Fragment>
        );
    }
}

export default Container;
