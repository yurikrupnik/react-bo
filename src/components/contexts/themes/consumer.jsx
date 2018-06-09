import React, { Component } from 'react';
import { Consumer } from './context';


const DefaultConsumer = (props) => {
    return (
        <div>
            <button style={{ background: props.theme.background }} onClick={props.toggleTheme}>
                clicks
            </button>
        </div>
    );
};

class ThemesConsumer extends Component {
    render() {
        if (typeof this.props.render === 'function') {
            // console.log('render props');
            return this.props.render({});
        }
        return (
            <Consumer>
                {(props) => {
                    console.log('props.render', props.render);

                    // console.log('selectTheme', props.toggleTheme);
                    // console.log('mam', props.mam);
                    // console.log('theme', props.theme);

                    // console.log('props', props);
                    // const { data } = props;
                    if (typeof this.props.render === 'function') {
                        // console.log('render props');
                        return this.props.render(props);
                    }
                    return (
                        <DefaultConsumer {...props} />
                    );
                }}
            </Consumer>
        );
    }
}

export default ThemesConsumer;
