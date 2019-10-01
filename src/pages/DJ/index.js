import React, { useContext, useState, useEffect } from 'react';
import { concat } from 'lodash';
import cn from 'classnames';
import StackGrid from 'react-stack-grid';

import Player from '../../components/Player';
import Playlist from '../../components/Playlist';
import { SpotifyContext } from '../../contexts';
import asPage from '../../hocs/asPage';
import { getAccessTokenFromURL, orderPlaylists } from '../../utils';

import styles from './styles.css';

/**
 * DJ page where all the Jive magic happens, such as
* playback, playlist selection, and time configuration.
 */
const DJ = ({ className, setDocumentTitle }) => {
  const spotify = useContext(SpotifyContext);
  const [playlists, setPlaylists] = useState([]);
  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((playlistId) => playlistId != id));
    } else {
      setSelected(concat(selected, id));
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
      .then(({ items }) => setPlaylists(orderPlaylists(items)), console.log);
  }, []);

  const selectedPlaylists = playlists.filter(({ id }) => selected.includes(id));

  return (
    <div className={cn(styles.page, className)}>
      <Player
        className={styles.player}
        playlists={selectedPlaylists}
        setDocumentTitle={setDocumentTitle}
      />
      <StackGrid className={styles.mosaic} columnWidth={200}>
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
