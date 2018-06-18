import React, { Component, Fragment } from 'react';
import img from '../../assets/IF-pin1.png';

// wrapper component that renders children
// usually used to wrap some logic in lifecycle events
// limitations - pass state/props to children
// using state here is useless

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

// regular func - no lifecycle and no state - dumb = PureComponent
// same thing with state and lifecycle - smart = Component
function StateAndToggle(props) {
    const { state, toggle } = props;
    return (
        <div>
            <div>state: {state.toString()}</div>
            <button onClick={toggle}>toggle</button>
        </div>
    );
}

// hoc 1 - example
function Hoc2Wrapper() {
    return (
        <div>
            <h2>Hoc Wrapper stuff</h2>
        </div>
    );
}

function Hoc2(Wrapper) {
    return class extends Component {
        render() {
            return <Wrapper />;
        }
    };
}

// hoc 2 - example
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

class RenderPropStateAndToggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => {
            return { isOpen: !prevState.isOpen };
        });
    }

    render() {
        const { render } = this.props;
        return render({
            isOpen: this.state.isOpen,
            toggle: this.toggle,
        });
    }
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

function FuHocWrapper(props) {
    return (
        <div>
            <h2>Age is: {props.age}</h2>
        </div>
    );
}

function FuRenderProps(props) {
    return props.render(props);
}

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lo: false
        };
    }

    render() {
        const HocInRender = Hoc2(Hoc2Wrapper);
        const WithStateAndToggleReady = WithStateAndToggle(StateAndToggle);
        const FuHocC = fuHoc({ age: 21 })(FuHocWrapper);
        return (
            <Fragment>
                <h2>hello from container</h2>
                <WrapperOfSomeKind children={<HocInRender />} />
                <WrapperOfSomeKind>
                    <HocInRender />
                </WrapperOfSomeKind>

                <h5>Hoc of State And Toggle</h5>
                <WithStateAndToggleReady />

                <h5>Render Prop State and Toggle</h5>
                <RenderPropStateAndToggle render={(props) => {
                    return <StateAndToggle state={props.isOpen} toggle={props.toggle} />;
                }}
                />
                <FuHocC />
                <FuRenderProps render={(props) => {
                    return <FuHocWrapper age={props.age} />
                }} age={23} />
                <HocInRender />
                <img src={img} alt="no imgag" />
            </Fragment>
        );
    }
}

export default Container;
