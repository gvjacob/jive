import React, { useContext, useState, useEffect } from 'react';
import cn from 'classnames';

import Playlist from '../../components/Playlist';
import { SpotifyContext } from '../../contexts';
import asPage from '../../hocs/asPage';
import { getAccessTokenFromURL } from '../../utils';

/**
 * DJ page where all the Jive magic happens, such as
 * playback, playlist selection, and time configuration.
 */
const DJ = ({ className }) => {
  const spotify = useContext(SpotifyContext);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const accessToken = getAccessTokenFromURL();

    if (!accessToken) {
      window.location.replace('/');
    }

    spotify.setAccessToken(accessToken);

    spotify
      .getUserPlaylists({ limit: 50 })
      .then(({ items }) => setPlaylists(items), console.log);
  }, []);

  return (
    <div className={cn(className)}>
      {playlists.map((playlist, index) => (
        <Playlist key={index} playlist={playlist} />
      ))}
    </div>
  );
};

export default asPage(DJ);
