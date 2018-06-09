import React, { Component } from 'react';
import { Provider } from './context';
import usersApi from '../../../api/users/api';

class ThemesProvider extends Component {
    constructor(props, context) {
        super(props, context);

        console.log('props', props);
        console.log('context', context);
        this.state = {
            data: [],
            loading: false
        };

        // this.fetch = (params, cb) => {
        //     return usersApi.read(params).then((res) => {
        //         console.log('res', res);
        //         this.setState(() => {
        //             return {
        //                 data: res
        //             };
        //         }, cb);
        //     });
        // };
    }

    // componentDidMount() {
    //     this.fetch();
    // }

    render() {
        const { theme, data } = this.state;
        return (
            <Provider value={{
                data,
                theme,
                toggleTheme: this.toggleTheme
            }} >
                {this.props.children}
            </Provider>
        );
    }
}

export default ThemesProvider;
