import React, { useContext, useState, useEffect } from 'react';
import cn from 'classnames';
import StackGrid from 'react-stack-grid';

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
  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((playlistId) => playlistId != id));
    } else {
      setSelected(selected.concat([id]));
    }
  };

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
      <StackGrid columnWidth={200}>
        {playlists.map((playlist, index) => (
          <Playlist
            key={index}
            playlist={playlist}
            selected={selected.includes(playlist.id)}
            toggle={toggle}
          />
        ))}
      </StackGrid>
    </div>
  );
};

export default asPage(DJ);
