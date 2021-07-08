// import React from 'react';
// import { shallow } from 'enzyme';
// import Map from './Map';

// describe('<Map />', () => {
//   let component;

//   beforeEach(() => {
//     component = shallow(<Map />);
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
import Map from './Map';

afterEach(cleanup)

describe('<Map />', () => {
  test('it should mount', () => {
    render(<Map testing={true}/>);
    const map = screen.getByTestId('Maptest');
    expect(map).toBeInTheDocument();
  });
});