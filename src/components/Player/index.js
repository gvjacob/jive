import React, { useEffect, useState, useContext, Fragment } from 'react';
import { get, isEmpty } from 'lodash';
import cn from 'classnames';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import AddIcon from '@material-ui/icons/Add';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import { SpotifyContext } from '../../contexts';
import styles from './styles.css';

/**
 * Player component displaying all media controls, and current
 * state of the web playback.
 */
const Player = ({ className, playlists }) => {
  const [paused, setPaused] = useState(true);
  const [track, setTrack] = useState({ name: '', artist: '' });
  const [player, setPlayer] = useState(null);
  const spotify = useContext(SpotifyContext);

  useEffect(() => {
    if (player) {
      player.addListener('player_state_changed', ({ paused, track_window }) => {
        const { name, artists } = track_window.current_track;
        const artist = get(artists, '[0].name', '');
        setTrack({ name, artist });
        setPaused(paused);
      });
    }
  }, [player]);

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
        <div className={styles.selectPlaylists}>Select Playlists</div>
      ) : (
        <Fragment>
          <div className={styles.currentPlaying}>
            <div className={styles.title}>{track.name}</div>{' '}
            <div className={styles.artist}>{track.artist}</div>
          </div>
          <div className={styles.media}>
            <IconButton aria-label="Previous Playlist">
              <NavigateBeforeIcon fontSize={'large'} />
            </IconButton>

            <IconButton aria-label="Previous">
              <SkipPreviousIcon fontSize={'large'} />
            </IconButton>

            <Fab
              color="primary"
              aria-label="Play / Pause"
              onClick={togglePlayer}
            >
              {paused ? (
                <PlayIcon fontSize={'large'} />
              ) : (
                <PauseIcon fontSize={'large'} />
              )}
            </Fab>

            <IconButton aria-label="Next">
              <SkipNextIcon fontSize={'large'} />
            </IconButton>

            <IconButton aria-label="Next Playlist">
              <NavigateNextIcon fontSize={'large'} />
            </IconButton>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Player;
