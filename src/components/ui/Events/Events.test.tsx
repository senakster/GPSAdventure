/**
 * default generate-react-cli testing library setup
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Events, { EventDetails } from './Events';
import userEvent from '@testing-library/user-event'

afterEach(cleanup)

describe('<Events />', () => {
  test('it should mount', () => {
    render(<Events />);
    const events = screen.getByTestId('Eventstest');
    expect(events).toBeInTheDocument();
  });
  
  test('+Event button should create new event', () => {
    render(<Events />);
    const newEventBtn = screen.getByText('+Event');
    expect(newEventBtn).toBeInTheDocument();
  });
});

/**
 * IMPLEMENT MOCK STATE
 * https://polvara.me/posts/mocking-context-with-react-testing-library
 */
describe('<EventDetails />', () => {
  test('it should not mount when inactive', () => {
    render(<EventDetails />);
    const eventDetails = screen.queryByTestId('EventDetailstest');
    expect(eventDetails).toBe(null);
  });
  

  // test('types inside textarea', () => {
  //   userEvent.type(screen.getByRole('textbox'), 'Hello, World!')
  //   expect(screen.getByRole('textbox')).toHaveValue('Hello, World!')
  // })
});