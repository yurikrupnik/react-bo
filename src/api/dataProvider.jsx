import React, { Fragment, cloneElement, createElement } from 'react';
import providers from './providers';

const DataProviders = props => providers.reduce((acc, C) => {
    if (acc.props.children) {
        const { children } = acc.props;
        return cloneElement(
            acc, {},
            cloneElement(children, {}, createElement(C, {}, props.children))
        );
    }
    return cloneElement(acc, {}, createElement(C, {}, props.children));
}, <Fragment />);

export default DataProviders;
