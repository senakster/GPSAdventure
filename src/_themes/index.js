// Tutorial: https://css-tricks.com/a-dark-mode-toggle-with-react-and-themeprovider/

// global.js -> renamed _themes
// Source: https://github.com/maximakymenko/react-day-night-toggle-app/blob/master/src/global.js#L23-L41

// import React from 'react'
import { createGlobalStyle  } from 'styled-components'
import vividTheme from './theme.vivid'
import paleTheme from './theme.pale'
import nightTheme from './theme.night'
import darkTheme from './theme.dark'

export { mapTilesets } from './mapTiles'

function t(c) {
  return {
    body: c.bgColor,
    text: c.textColor,
    toggleBorder: c.primaryDarkColor,
    primaryGradient: `linear-gradient(45deg, ${c.primaryColor}, ${c.primaryDarkColor})`,
    secondaryGradient: `linear-gradient(45deg, ${c.secondaryColor}, ${c.secondaryDarkColor})`,
    primaryColor: c.primaryColor,
    secondaryColor: c.secondaryColor,
    primaryDarkColor: c.primaryDarkColor,
    secondaryDarkColor: c.secondaryDarkColor
  }
}


export const themes = [
  {id: 0, name: 'dark', theme: t(darkTheme) },
  {id: 1, name: 'vivid', theme: t(vividTheme) },
  { id: 2, name: 'night', theme: t(nightTheme) },
  { id: 3, name: 'pale', theme: t(paleTheme) },

]


export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  :root {
    --text-color: ${({ theme }) => theme?.text ? theme.text : 'black'};
    --background-color: ${({ theme }) => theme?.body ? theme.body : 'white'};
    --primary-color: ${({ theme }) => theme?.primaryColor ? theme.primaryColor : 'darkgrey'};
    --secondary-color: ${({ theme }) => theme?.secondaryColor ? theme.secondaryColor : 'white'};
    --primary-dark-color: ${({ theme }) => theme?.primaryDarkColor || 'black'};
    --secondary-dark-color: ${({ theme }) => theme?.secondaryDarkColor || 'grey'};
    --primary-gradient: ${({ theme }) => theme?.primaryGradient || 'linear-gradient(45deg,black,white)'};
    --secondary-gradient: ${({ theme }) => theme?.secondaryGradient || 'linear-gradient(45deg,white,black)'};
  }
  body {
    // align-items: center;
    background: ${({ theme }) => theme?.body};
    color: ${({ theme }) => theme?.text};
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: background 250ms ease-in, color 250ms linear;
  }`