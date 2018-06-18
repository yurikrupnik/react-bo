import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Consumer as ThemesConsumer } from '../contexts/themes';

const Something = props => (<div>hello theme is {props.theme.background}</div>);

Something.propTypes = {
    theme: PropTypes.shape({
        background: PropTypes.string.isRequired
    }).isRequired
};

function MainNav() {
    return (
        <header>
            <ThemesConsumer />

            <ThemesConsumer render={(props) => {
                return (
                    <Something {...props} />
                );
            }}
            />
            <div>
                <div>
                    <Link to="/">Dashboard</Link>
                </div>
                <div>
                    <Link to="/about">About</Link>
                </div>
                <div>
                    <Link to="/topics">Topics</Link>
                </div>
                <div>
                    <Link to="/users">Users</Link>
                </div>
                <div>
                    <Link to="/projects">Pojects</Link>
                </div>
                <div>
                    <Link to="/examples">Examples</Link>
                </div>
            </div>
        </header>
    );
}

export default MainNav;
