import React from 'react';
import Spotify from 'spotify-web-api-node';
import { BrowserRouter, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import pink from '@material-ui/core/colors/pink';

import { SpotifyContext } from '../../contexts';
import Login from '../Login';
import DJ from '../DJ';

/**
 * Main page for the entire application. It switches
 * between the Login and DJ pages.
 */
const App = (props) => {
  const redirectUri = 'http://localhost:8080';
  const clientId = 'a145c7bab9204f10b6db4651057b51bb';
  const clientSecret = 'c451f51e753840408ee8fd302421968a';

  const spotify = new Spotify({
    redirectUri,
    clientId,
    clientSecret,
  });

  const theme = createMuiTheme({
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
    <ThemeProvider theme={theme}>
      <SpotifyContext.Provider value={spotify}>
        <BrowserRouter>
          <Route path={'/'} exact component={Login} />
          <Route path={'/dj'} exact component={DJ} />
        </BrowserRouter>
      </SpotifyContext.Provider>
    </ThemeProvider>
  );
};

export default App;
