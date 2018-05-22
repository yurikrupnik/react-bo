import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { mapToProps as sessionMapToProps } from '../../store/config/session/selector';
import routes from './routes';

class MenuRight extends Component {
    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleLogOut() {
        // singout().then(logout);
    }

    handleClick(e) {
        let { history } = this.props;
        history.push(`/${e.target.textContent.toLowerCase()}`);
    }

    render() {
        return (
            <div>
                <IconMenu
                    iconButtonElement={
                        <IconButton><MoreVertIcon /></IconButton>
                    }
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                    <MenuItem primaryText="Sign out" onClick={this.handleLogOut} />
                </IconMenu>
            </div>
        );
    }

}

class MenuLeft extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleLogOut() {
        // singout();
    }

    handleClick(e) {
        const { history } = this.props;
        history.push(`/${e.target.textContent.toLowerCase()}`);
    }

    render() {
        const menuOption = routes.filter(route => !route.path.includes('/*'));
        return (
            <div>
                <IconMenu
                    iconButtonElement={
                        <IconButton><MoreVertIcon/></IconButton>
                    }
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                    {menuOption.map((route, index) => {
                        return <MenuItem
                            key={index}
                            primaryText={`${route.path.slice(1, 2).toUpperCase()}${route.path.slice(2)}`}
                            onClick={this.handleClick.bind(this)}/>
                    })}
                    <MenuItem primaryText="Sign out" onClick={this.handleLogOut.bind(this)}/>
                </IconMenu>
            </div>
        );
    }

}

class Header extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        const { session, history, location } = this.props;
        const { pathname } = location;
        if (!session && pathname !== '/register') {
            history.push('/register');
        }
    }

    render() {
        const { location } = this.props;
        const { pathname } = location;
        const title = `${pathname.slice(1, 2).toUpperCase()}${pathname.slice(2)}`;

        return (
            <div>
                <AppBar
                    title={title}
                    iconElementRight={<MenuRight {...this.props}/>}
                    iconElementLeft={<MenuLeft {...this.props}/>}
                />
            </div>
        );
    }
}
Header.propTypes = {
    session: PropTypes.string.isRequired,
    history: PropTypes.shape({}).isRequired,
    location: PropTypes.shape({}).isRequired,
};

function composedMapToProps(state) {
    return {
        session: sessionMapToProps(state)
    };
}

export default withRouter(connect(composedMapToProps)(Header));

// export default () => (<div>header here</div>);
