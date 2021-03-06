import React from 'react';
import Spotify from 'spotify-web-api-js';
import { BrowserRouter, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import pink from '@material-ui/core/colors/pink';

import { SpotifyContext } from '../../contexts';
import Login from '../Login';
import DJ from '../DJ';
import styles from './styles.css';

/**
 * Main page for the entire application. It switches
 * between the Login and DJ pages.
 */
const App = (props) => {
  const spotify = new Spotify();

  const theme = createMuiTheme({
    overrides: {
      MuiIconButton: {
        root: {
          color: 'white',
        },
      },
    },
    palette: {
      primary: pink,
    },
    typography: {
      fontFamily: [
        'Avenir',
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        'Helvetica Neue',
        'sans-serif',
      ].join(','),
      button: {
        fontWeight: 'bold',
      },
    },
  });

  return (
    <div className={styles.app}>
      <ThemeProvider theme={theme}>
        <SpotifyContext.Provider value={spotify}>
          <BrowserRouter>
            <Route path={'/'} exact component={Login} />
            <Route path={'/dj'} exact component={DJ} />
          </BrowserRouter>
        </SpotifyContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
