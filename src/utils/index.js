import { orderBy, partition } from 'lodash';

/**
 * Get the 'code' query param from current URL.
 * Return null if not found.
 */
export const getAccessTokenFromURL = () => {
  const location = window.location.href.replace('#', '?');
  const params = new URL(location).searchParams;
  return params.get('access_token', null);
};

export const createAuthorizeURL = (
  clientId,
  redirectURI,
  state,
  scopes = [],
) => {
  const queryScopes = scopes.join('%20');

  return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectURI}&state=${state}&scope=${queryScopes}`;
};

export const orderPlaylists = (playlists) => {
  const styles = ['latin', 'rhythm', 'standard', 'smooth', 'open floor'];

  const [ballroom, others] = partition(playlists, ({ name }) =>
    includesOneOf(name, styles),
  );

  return ballroom.concat(others);
};

const includesOneOf = (value, options) => {
  return options.some((option) => value.toLowerCase().includes(option));
};
