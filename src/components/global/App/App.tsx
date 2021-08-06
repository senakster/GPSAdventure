import React from 'react';
import './App.css';

// Navigation
import Routes from '../Router/Router';
// import Navigation from 'components/ui/Navigation/Navigation';
// import { history } from '_helpers'

// Global state
import { StateProvider, initialState } from '_state'
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, themes } from '_themes'
import Storage from 'components/global/Storage/Storage'
import Header from 'components/ui/Header/Header';
import Messages from 'components/global/Messages/Messages';
import Themes from '../Themes/Themes';
// import Themes from 'components/global/Themes/Themes';

function App() {
  const [theme, setTheme] = React.useState(themes.find((t) => t.id === 0)?.name || 'vivid');

  function handleThemeChange(event: any) {
    const target = event.target;
    const theme = themes.find((t) => t.id === parseInt(target.value));
    theme && setTheme(theme.name);
  }
  
  const bgImg = `https://upload.wikimedia.org/wikipedia/commons/b/b7/Earth_%2816530938850%29.jpg`;
  // const bgImg = `https://upload.wikimedia.org/wikipedia/commons/4/49/Geo-wiki.png`;

  return (
    <StateProvider value={initialState}>
    <Storage />
    <ThemeProvider theme={themes.find((t) => t.name === theme)?.theme} >
      <GlobalStyles />
        <Themes variant="minimal" theme={theme} handler={handleThemeChange} />
      <div className="App" data-testid={`Apptest`}>
        <Messages />
          <Header backgroundImage={`${bgImg}`} navigation="true" title={`GPSApp`} 
          // variant={`transparent`}
            variant={`scrollCollapse`}
          />
        <Routes />
      </div>
    </ThemeProvider>
    </StateProvider>
  );
}

export default App;
