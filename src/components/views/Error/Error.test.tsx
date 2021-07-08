// import React from 'react';
// import { shallow } from 'enzyme';
// import Error from './Error';

// describe('<Error />', () => {
//   let component;

//   beforeEach(() => {
//     component = shallow(<Error />);
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
import Error from './Error';

afterEach(cleanup)

describe('<Error />', () => {
  test('it should mount', () => {
    render(<Error />);
    const error = screen.getByTestId('Errortest');
    expect(error).toBeInTheDocument();
  });
});