import React, { useEffect, useState, useContext, Fragment } from 'react';
import { get, isEmpty } from 'lodash';
import cn from 'classnames';

import Idle from '../../components/Idle';
import Media from '../../components/Media';
import Disconnected from '../../components/Disconnected';
import { SpotifyContext } from '../../contexts';
import usePlaylists from '../../hooks/usePlaylists';
import styles from './styles.css';

/**
 * Player component displaying all media controls, and current
 * state of the web playback.
 */
const Player = ({ className, playlists, setDocumentTitle }) => {
  const spotify = useContext(SpotifyContext);
  const [connected, setConnected] = useState(false);
  const [player, setPlayer] = useState(null);
  const [previous, next] = usePlaylists(playlists, spotify);
  const [track, setTrack] = useState({
    name: null,
    artist: null,
    paused: true,
  });

  const getPlayerStateFromPayload = (payload) => {
    const { paused, track_window } = payload;
    const { name, artists } = track_window.current_track;
    const artist = get(artists, '[0].name', '');

    return { name, artist, paused };
  };

  const togglePlayer = () => player.togglePlay();

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
        volume: 0.5,
      });

      player.addListener('player_state_changed', (payload) => {
        if (payload === null) {
          setConnected(false);
        } else {
          const { name, artist, paused } = getPlayerStateFromPayload(payload);

          setTrack({ name, artist, paused });
          setConnected(true);
        }
      });

      player.addListener('ready', ({ device_id }) => {
        console.log(`Connected with ${device_id}`);
        setPlayer(player);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID is not ready for playback', device_id);
      });

      player.on('initialization_error', ({ message }) => {
        console.error('Failed to initialize', message);
      });

      player.on('authentication_error', ({ message }) => {
        console.error('Failed to authenticate', message);
      });

      player.on('account_error', ({ message }) => {
        console.error('Failed to validate Spotify account', message);
      });

      player.on('playback_error', ({ message }) => {
        console.error('Failed to perform playback', message);
      });

      player.connect().then((success) => {
        console.log(
          success ? 'Connected to Spotify Player' : 'Failed to connect',
        );
      });
    };
  }, []);

  return (
    <div className={cn(styles.player, className)}>
      {connected ? (
        isEmpty(playlists) ? (
          <Idle />
        ) : (
          <Media
            {...track}
            togglePlayer={togglePlayer}
            next={next}
            previous={previous}
          />
        )
      ) : (
        <Disconnected />
      )}
    </div>
  );
};

export default Player;
