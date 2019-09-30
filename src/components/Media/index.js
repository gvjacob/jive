import React, { Fragment } from 'react';
import cn from 'classnames';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import styles from './styles.css';

const Media = ({ name, artist, next, previous, paused, togglePlayer }) => {
  return (
    <Fragment>
      <div className={styles.track}>
        <div className={styles.title}>{name}</div>{' '}
        <div className={styles.artist}>{artist}</div>
      </div>
      <div className={styles.media}>
        <IconButton aria-label="Previous Playlist">
          <NavigateBeforeIcon fontSize={'large'} />
        </IconButton>

        <IconButton aria-label="Previous" onClick={previous}>
          <SkipPreviousIcon fontSize={'large'} />
        </IconButton>

        <Fab color="primary" aria-label="Play / Pause" onClick={togglePlayer}>
          {paused ? (
            <PlayIcon fontSize={'large'} />
          ) : (
            <PauseIcon fontSize={'large'} />
          )}
        </Fab>

        <IconButton aria-label="Next" onClick={next}>
          <SkipNextIcon fontSize={'large'} />
        </IconButton>

        <IconButton aria-label="Next Playlist">
          <NavigateNextIcon fontSize={'large'} />
        </IconButton>
      </div>
    </Fragment>
  );
};

export default Media;
