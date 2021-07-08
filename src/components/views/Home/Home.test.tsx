// import React from 'react';
// import { shallow } from 'enzyme';
// import Home from './Home';

// describe('<Home />', () => {
//   let component;

//   beforeEach(() => {
//     component = shallow(<Home />);
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
import Home from './Home';

afterEach(cleanup)

describe('<Home />', () => {
  test('it should mount', () => {
    render(<Home />);
    const home = screen.getByTestId('Hometest');
    expect(home).toBeInTheDocument();
  });
});