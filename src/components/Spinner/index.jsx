import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
    root: {
        flexGrow: 1,
    },
};

function LinearIndeterminate(props) {
    // const { classes } = props;/
    return (
        <div>
            <LinearProgress />
            <br />
            <LinearProgress color="secondary" />
        </div>
    );
}

// LinearIndeterminate.propTypes = {
//     classes: PropTypes.object.isRequired,
// };
// const Spinner =  withStyles(styles)(LinearIndeterminate);
export default withStyles(styles)(LinearIndeterminate);
