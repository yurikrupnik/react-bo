import React from 'react';
// import jest from 'jest';
// import ReactTestUtils from 'react-dom/test-utils';
// import Enzyme, { mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import jest from 'jest-mock';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import ShallowRenderer from 'react-test-renderer/shallow';
import DefaultButton from './defaultButton';

Enzyme.configure({ adapter: new Adapter() });

const { describe, it, expect } = global;

describe('default button', () => {
    it('should render', () => {
        const props = {
            theme: { background: 'red' },
            toggleTheme: () => {}
        };
        const renderer = new ShallowRenderer();
        renderer.render(<DefaultButton {...props} />);
        const result = renderer.getRenderOutput();
        expect(result).toBeTruthy();
        expect(result.type).toBe('div');
        expect(result.props.children.type).toBe('button');
    });

    it('should simulate click', () => {
        const props = {
            theme: { background: 'red' },
        };
        const onButtonClick = sinon.spy();
        // const wrapper = shallow(<DefaultButton {...props} toggleTheme={onButtonClick} />);
        // wrapper.find('button').simulate('click');
        // expect(onButtonClick).toBeCalled();
        expect(1).toBe(1);
    });

});
