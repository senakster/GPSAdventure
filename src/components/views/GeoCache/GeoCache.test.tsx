import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GeoCache from './GeoCache';

describe('<GeoCache />', () => {
  test('it should mount', () => {
    render(<GeoCache />);
    
    const geoCache = screen.getByTestId('GeoCache');

    expect(geoCache).toBeInTheDocument();
  });
});