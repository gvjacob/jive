import React, { useRef, useEffect, useState, useContext } from 'react';
import { get, isEmpty } from 'lodash';
import cn from 'classnames';

import Idle from '../../components/Idle';
import Media from '../../components/Media';
import Disconnected from '../../components/Disconnected';
import { SpotifyContext } from '../../contexts';
import useIndex from '../../hooks/useIndex';
import { getRandomInt } from '../../utils';
import styles from './styles.css';

/**
 * Player component displaying all media controls, and current
 * state of the web playback.
 */
const Player = ({ className, playlists, setDocumentTitle }) => {
  const spotify = useContext(SpotifyContext);

  const [connected, setConnected] = useState(false);
  const [player, setPlayer] = useState(null);

  const { previous: previousPlaylist, next: nextPlaylist, index } = useIndex(
    playlists,
  );

  const nextPlaylistRef = useRef(nextPlaylist);
  nextPlaylistRef.current = nextPlaylist;

  const [track, setTrack] = useState({
    name: null,
    artist: null,
    paused: true,
  });

  const getPlayerStateFromPayload = (payload) => {
    const { paused, track_window, duration, position } = payload;
    const { name, artists } = track_window.current_track;
    const artist = get(artists, '[0].name', '');

    return { name, artist, paused, duration, position };
  };

  const playFromPlaylist = (index) => {
    const { id, uri } = playlists[index];

    spotify.getPlaylistTracks(id).then(({ items }) => {
      const rand = getRandomInt(items.length);
      spotify.play({ context_uri: uri, offset: { position: rand } });
    });
  };

  const next = () => playFromPlaylist(index);
  const previous = () => playFromPlaylist(index);
  const togglePlayer = () => player.togglePlay();
  const getPlaylistName = () => get(playlists[index], 'name', '');

  useEffect(() => {
    if (!isEmpty(playlists) && connected) {
      playFromPlaylist(index);
    }
  }, [index]);

  useEffect(() => {
    const { name, artist } = track;
    setDocumentTitle(name ? `${name} by ${artist}` : null);
  }, [track]);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: 'Jive',
        getOAuthToken: (callback) => {
          callback(spotify.getAccessToken());
        },
        volume: 0.2,
      });

      player.addListener('player_state_changed', (payload) => {
        if (payload === null) {
          setConnected(false);
        } else {
          const {
            name,
            artist,
            paused,
            duration,
            position,
          } = getPlayerStateFromPayload(payload);

          if (Math.abs(position - duration) <= 5000) {
            nextPlaylistRef.current();
          }

          setTrack({ name, artist, paused });
          setConnected(true);
        }
      });

      player.addListener('ready', ({ device_id }) => {
        console.log(`Connected with ${device_id}`);
        setPlayer(player);
      });

      player.connect().then((success) => {
        console.log(
          success ? 'Connected to Spotify Player' : 'Failed to connect',
        );
      });
    };
  }, []);

  return (
    <div className={cn(styles.player, className)} data-testid={'Player'}>
      {connected ? (
        isEmpty(playlists) ? (
          <Idle />
        ) : (
          <Media
            {...track}
            togglePlayer={togglePlayer}
            next={next}
            previous={previous}
            nextPlaylist={nextPlaylist}
            previousPlaylist={previousPlaylist}
            playlistName={getPlaylistName()}
          />
        )
      ) : (
        <Disconnected />
      )}
    </div>
  );
};

export default Player;
