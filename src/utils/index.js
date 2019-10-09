import { partition, sortBy, findIndex } from 'lodash';

/**
 * Get the 'access_token' query param from current URL.
 * Return null if not found.
 */
export const getAccessTokenFromURL = (url) => {
  const location = url.replace('#', '?');
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

/**
 * Given list of Spotify playlists, order them by
 * relevance to ballroom dance styles.
 */
export const orderPlaylists = (playlists) => {
  const styles = ['latin', 'rhythm', 'standard', 'smooth', 'open floor'];
  const sorted = sortBy(playlists, [({ name }) => indexOf(name, styles)]);

  return sorted;
};

/**
 * Get the index of value in options array.
 * Return null if not found.
 */
export const indexOf = (value, options) => {
  const index = findIndex(options, (option) =>
    value.toLowerCase().includes(option.toLowerCase()),
  );

  return index >= 0 ? index : null;
};

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
