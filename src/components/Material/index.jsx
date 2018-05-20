import React from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import tabEvent from 'react-tap-event-plugin';

tabEvent();

function Material() {
    const { userAgent, children } = this.props;
    const muiTheme = getMuiTheme(lightBaseTheme, { userAgent });
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            {children}
        </MuiThemeProvider>
    );
}
Material.propTypes = {
    userAgent: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
};
// export default class Material extends Component {
//     static propTypes = {
//         userAgent: PropTypes.string.isRequired,
//         children: PropTypes.element.isRequired
//     };
//
//     render() {
//         const { userAgent, children } = this.props;
//         const muiTheme = getMuiTheme(lightBaseTheme, { userAgent });
//         return (
//             <MuiThemeProvider muiTheme={muiTheme}>
//                 {children}
//             </MuiThemeProvider>
//         );
//     }
// }

export default Material;
