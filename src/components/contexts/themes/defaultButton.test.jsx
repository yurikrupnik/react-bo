import React from 'react';
// import jest from 'jest';
// import ReactTestUtils from 'react-dom/test-utils';
// import Enzyme, { mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import jest from 'jest-mock';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import sinon from 'sinon';
import DefaultButton from './defaultButton';

Enzyme.configure({ adapter: new Adapter() });

const { describe, it, expect } = global;

describe('default button', () => {
    it('renders three <DefaultButton /> components', () => {
        const wrapper = shallow(<DefaultButton theme={{ foreground: '#000000', background: '#eeeeee', color: 'red' }} toggleTheme={() => {}} />);
        expect(wrapper.length).toBe(1);
    });
});
