// import React from 'react';
// import { shallow } from 'enzyme';
// import Navigation from './Navigation';

// describe('<Navigation />', () => {
//   let component;

//   beforeEach(() => {
//     component = shallow(<Navigation />);
//   });

//   test('It should mount', () => {
//     expect(component.length).toBe(1);
//   });
// });

/**
 * default generate-react-cli testing library setup
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navigation from './Navigation';
import { history } from '_helpers/history'

afterEach(cleanup)

describe('<Navigation />', () => {
  test('it should mount', () => {
    render(<Navigation history={history} />);
    const navigation = screen.getByTestId('Navigationtest');
    expect(navigation).toBeInTheDocument();
  });
});