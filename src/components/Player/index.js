import React, { useEffect, useContext } from 'react';
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
const Player = ({ className }) => {
  const spotify = useContext(SpotifyContext);

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
          console.log(
            'The Web Playback SDK successfully connected to Spotify!',
          );

          player.resume().then(() => {
            console.log('Resumed!');
          });
        }
      });
    };
  }, []);

  return (
    <div className={cn(styles.player, className)}>
      <div className={styles.title}>Select Playlists</div>
      <div className={styles.media}>
        <IconButton aria-label="Previous Playlist">
          <NavigateBeforeIcon fontSize={'large'} />
        </IconButton>

        <IconButton aria-label="Previous">
          <SkipPreviousIcon fontSize={'large'} />
        </IconButton>

        <Fab color="primary" aria-label="add">
          <PlayIcon fontSize={'large'} />
        </Fab>

        <IconButton aria-label="Next">
          <SkipNextIcon fontSize={'large'} />
        </IconButton>

        <IconButton aria-label="Next Playlist">
          <NavigateNextIcon fontSize={'large'} />
        </IconButton>
      </div>
    </div>
  );
};

export default Player;
