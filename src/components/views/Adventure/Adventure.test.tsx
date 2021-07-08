import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Adventure from './Adventure';

describe('<Adventure />', () => {
  test('it should mount', () => {
    render(<Adventure />);
    
    const adventure = screen.getByTestId('Adventure');

    expect(adventure).toBeInTheDocument();
  });
});