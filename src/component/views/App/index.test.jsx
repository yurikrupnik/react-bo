import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Component from './index';

const { describe, it, expect } = global;

Enzyme.configure({ adapter: new Adapter() });

function setup() {
    const props = { userAgent: 'dasd' };

    const enzymeWrapper = mount(<Component {...props} />);

    return {
        props,
        enzymeWrapper
    };
}


describe('sda', () => {
    it('should render', () => {
        const { enzymeWrapper } = setup();
        expect(enzymeWrapper.length).toBeTruthy();
    });
});

