import React, { useEffect, useState, useContext, Fragment } from 'react';
import { get, isEmpty } from 'lodash';
import cn from 'classnames';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import usePlaylists from '../../hooks/usePlaylists';
import Idle from '../../components/Idle';
import Media from '../../components/Media';
import { SpotifyContext } from '../../contexts';
import styles from './styles.css';

/**
 * Player component displaying all media controls, and current
 * state of the web playback.
 */
const Player = ({ className, playlists, setDocumentTitle }) => {
  const [paused, setPaused] = useState(true);
  const [track, setTrack] = useState({ name: null, artist: null });
  const [player, setPlayer] = useState(null);
  const spotify = useContext(SpotifyContext);
  const [previous, next] = usePlaylists(playlists, spotify);

  useEffect(() => {
    if (player) {
      player.addListener('player_state_changed', (payload) => {
        if (payload === null) {
          console.log('Jive has been disconnected');
          return;
        }

        const { paused, track_window } = payload;
        const { name, artists } = track_window.current_track;
        const artist = get(artists, '[0].name', '');

        setTrack({ name, artist });
        setPaused(paused);
      });
    }
  }, [player]);

  useEffect(() => {
    setDocumentTitle(track.name);
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

      player.connect().then((success) => {
        if (success) {
          console.log('Connected to Spotify Player');
          setPlayer(player);
        }
      });
    };
  }, []);

  const togglePlayer = () => player.togglePlay();

  return (
    <div className={cn(styles.player, className)}>
      {isEmpty(playlists) ? (
        <Idle />
      ) : (
        <Media
          {...track}
          paused={paused}
          togglePlayer={togglePlayer}
          next={next}
          previous={previous}
        />
      )}
    </div>
  );
};

export default Player;
