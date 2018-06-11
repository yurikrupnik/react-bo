import React from 'react';
// import jest from 'jest';
import ReactTestUtils from 'react-dom/test-utils';
// import Enzyme, { mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import jest from 'jest-mock';
import ShallowRenderer from 'react-test-renderer/shallow';
import DefaultButton from './defaultButton';


// in your test:

const props = {
    theme: { background: 'red' },
    toggleTheme: () => {}
};

const renderer = new ShallowRenderer();
renderer.render(<DefaultButton {...props} />);
const result = renderer.getRenderOutput();
describe('default button', () => {
    it('should render', () => {
        // console.log('result', result);
        // console.log('result', result.props.children.type);
        // console.log('result', result.props.children.props);
        // console.log('result', result.props.toggleThem);
        // console.log('result', result.props.props);

        expect(result).toBeTruthy();
        expect(result.type).toBe('div');
        expect(result.props.children.type).toBe('button');

        // const wrapper = shallow(<Component startLogout={mockLogout}/>);
        // result.props.children.simulate('click');
        // result.find('button').at(0).simulate('click');
        // expect(my).toHaveBeenCalled();
        // expect(result.style).toBe('div');
        // expect(result.props.toggleThem).toBe(Function);
        // expect(result).toBe(null);
        // const { enzymeWrapper } = setup();
        // expect(enzymeWrapper.length).toBeTruthy();
    });

    it('should simulate click', function () {
        const props = {
            theme: { background: 'red' },
        };
        const mockToggle = jest.fn();
        const renderer = new ShallowRenderer();
        renderer.render(<DefaultButton toggleTheme={mockToggle} {...props} />);
        const result = renderer.getRenderOutput();
// console.log('result .props.children', result.props.children);
// console.log('mockToggle', mockToggle);
//         ReactTestUtils.Simulate.click(result.props.children);

        // console.log('as', result.findRenderedDOMComponentWithTag('button'));

        // result.find('button').at(0).simulate('click');
        // expect(mockToggle).toBeCalled();
    });

});
