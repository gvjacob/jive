import React, { useEffect } from 'react';
import cn from 'classnames';
import Button from '@material-ui/core/Button';

import { createAuthorizeURL } from '../../utils';
import asPage from '../../hocs/asPage';
import styles from './styles.css';

/**
 * Login page for unauthenticated user.
 */
const Login = ({ className, setDocumentTitle }) => {
  const redirectURI = 'https://jive.surge.sh/dj';
  // const redirectURI = 'http://localhost:8080/dj';
  const clientId = 'a145c7bab9204f10b6db4651057b51bb';
  const scopes = [
    'user-read-private',
    'playlist-read-collaborative',
    'user-modify-playback-state',
    'streaming',
    'user-read-currently-playing',
    'user-read-playback-state',
  ];
  const state = 'jive';

  useEffect(() => {
    setDocumentTitle('Login');
  }, []);

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
    <div className={cn(styles.page, className)} data-testid={'Login'}>
      <div className={styles.login}>
        <div className={styles.title}>Jive</div>
        <div className={styles.subtitle}>
          <p>
            Automated Spotify DJ for playing various songs from your curated
            playlists.
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
