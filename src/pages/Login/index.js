import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import Button from '@material-ui/core/Button';

import { createAuthorizeURL } from '../../utils';
import asPage from '../../hocs/asPage';
import styles from './styles.css';

/**
 * Landing page for every unauthenticated user.
 */
const Login = ({ className, setDocumentTitle }) => {
  const redirectURI = 'https://jive.surge.sh/dj';
  const clientId = 'a145c7bab9204f10b6db4651057b51bb';
  const scopes = [
    'user-read-private',
    'user-read-email',
    'playlist-read-collaborative',
    'user-modify-playback-state',
    'streaming',
    'user-read-currently-playing',
    'user-read-playback-state',
  ];
  const state = 'some-state';

  useEffect(() => {
    setDocumentTitle('Login');
  });

  const login = () => {
    const authorizeURL = createAuthorizeURL(
      clientId,
      redirectURI,
      state,
      scopes,
    );

    window.location.replace(authorizeURL);
  };

  return (
    <div className={cn(styles.page, className)}>
      <div className={styles.login}>
        <div className={styles.title}>Jive</div>
        <div className={styles.subtitle}>
          <p>
            Automated DJ for choosing various ballroom songs from different
            dance styles.
          </p>
          <p>
            <b>Command your floor!</b>
          </p>
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
    </div>
  );
};

export default asPage(Login);
