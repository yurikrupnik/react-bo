import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import tabEvent from 'react-tap-event-plugin';

tabEvent();

// eslint-disable-next-line react/prefer-stateless-function
class Material extends Component {
    render() {
        const { userAgent, children } = this.props;
        const muiTheme = getMuiTheme(lightBaseTheme, { userAgent });
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                {children}
            </MuiThemeProvider>
        );
    }
}
Material.propTypes = {
    userAgent: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
};

export default Material;
