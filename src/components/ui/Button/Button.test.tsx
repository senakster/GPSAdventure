// /**
//  * default generate-react-cli enzyme setup
//  */
// import React from 'react';
// import { shallow } from 'enzyme';
// import Button from './Button';

// describe('<Button />', () => {
//   let component;

//   beforeEach(() => {
//     component = shallow(<Button />);
//   });

//   test('It should mount', () => {
//     expect(component.length).toBe(1);
//   });
// });


// /**
//  * React testing  recipes
//  * https://reactjs.org/docs/testing-recipes.html
//  */
// import { unmountComponentAtNode } from "react-dom";

// let container: HTMLDivElement | null = null;
// beforeEach(() => {
//   // setup a DOM element as a render target
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   // cleanup on exiting
//   container && unmountComponentAtNode(container);
//   container?.remove();
//   container = null;
// });


/**
 * React testing library
 * https://testing-library.com/docs/react-testing-library/intro
 */
// import { render, screen } from '_tests/test-utils';
// import Button from './Button';

// test('loads and displays button', async () => {
//     render(<Button />)

//     expect(screen.getByRole('heading')).toHaveTextContent('hello there')
//     expect(screen.getByRole('button')).toBeDisabled()
// })

/**
 * default generate-react-cli testing library setup
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from './Button';

afterEach(cleanup)

describe('<Button />', () => {
    test('it should mount', () => {
        render(<Button />);
        const button = screen.getByTestId('Buttontest');
        expect(button).toBeInTheDocument();
    });
});