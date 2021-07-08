// import React from 'react';
// import { shallow } from 'enzyme';
// import Header from './Header';

// describe('<Header />', () => {
//   let component;

//   beforeEach(() => {
//     component = shallow(<Header />);
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
import Header from './Header';

afterEach(cleanup)

describe('<Header />', () => {
  test('it should mount', () => {
    render(<Header />);
    const header = screen.getByTestId('Headertest');
    expect(header).toBeInTheDocument();
  });
});