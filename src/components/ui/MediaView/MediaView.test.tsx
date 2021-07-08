import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MediaView from './MediaView';

describe('<MediaView />', () => {
  test('it should mount', () => {
    render(<MediaView />);
    
    const mediaView = screen.getByTestId('MediaView');

    expect(mediaView).toBeInTheDocument();
  });
});