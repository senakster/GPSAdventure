import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card from './Card';

afterEach(cleanup)

describe('<Card />', () => {
  test('it should mount', () => {
    render(<Card />);
    
    const card = screen.getByTestId('Card');

    expect(card).toBeInTheDocument();
  });
});