// import React from 'react';
// import { shallow } from 'enzyme';
// import Createmap from './Createmap';

// describe('<Createmap />', () => {
//   let component;

//   beforeEach(() => {
//     component = shallow(<Createmap />);
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
import Createmap from './Createmap';

afterEach(cleanup)

describe('<Createmap />', () => {
  test('it should mount', () => {
    render(<Createmap />);
    const createmap = screen.getByTestId('Createmaptest');
    expect(createmap).toBeInTheDocument();
  });
});