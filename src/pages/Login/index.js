import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { SpotifyContext } from '../../contexts';
import styles from './styles.css';

/**
 * Landing page for every unauthenticated user.
 */
const Login = (props) => {
  const spotify = useContext(SpotifyContext);

  const scopes = ['user-read-private', 'user-read-email'];
  const state = 'some-state';
  const authorizeURL = spotify.createAuthorizeURL(scopes, state);

  const login = () => window.open(authorizeURL);

  return (
    <div className={styles.page}>
      <div className={styles.login}>
        <div className={styles.title}>Jive</div>
        <div className={styles.subtitle}>
          Automated DJ for choosing various ballroom songs from different dance
          styles. <b>Become the floor master!</b>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            color={'primary'}
            variant={'contained'}
            size={'large'}
            onClick={login}
          >
            Login to Spotify
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
