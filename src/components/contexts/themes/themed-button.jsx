import React from 'react';
import ThemeContext from './theme-context';

function ThemedButton(props) {
    return (
        <ThemeContext.Consumer>
            {(theme, selectTheme) => (
                <button
                    {...props}
                    style={{backgroundColor: theme.background}}
                />
            )}
        </ThemeContext.Consumer>
    );
}

export default ThemedButton;
