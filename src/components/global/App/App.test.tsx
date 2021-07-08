// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

/**
 * default generate-react-cli testing library setup
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

afterEach(cleanup)

describe('<App />', () => {
  test('it should mount', () => {
    render(<App />);
    const app = screen.getByTestId('Apptest');
    expect(app).toBeInTheDocument();
  });
});