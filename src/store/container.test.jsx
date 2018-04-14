import React from 'react';
import Enxyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Provider from './container';

const { describe, it, expect } = global;

Enxyme.configure({ adapter: new Adapter() });

function setup() {
    const enzymeWrapper = mount(<Provider><div>hello</div></Provider>);

    return {
        enzymeWrapper
    };
}


describe('sda', () => {
    it('should render', () => {
        const { enzymeWrapper } = setup();
        expect(enzymeWrapper.length).toBeTruthy();
    });
});

