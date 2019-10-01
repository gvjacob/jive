import React, { Fragment } from 'react';
import cn from 'classnames';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Tooltip from '@material-ui/core/Tooltip';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import styles from './styles.css';

const Media = ({
  name,
  artist,
  next,
  previous,
  nextPlaylist,
  previousPlaylist,
  paused,
  togglePlayer,
}) => {
  return (
    <Fragment>
      <div className={styles.track}>
        <div className={styles.title}>{name}</div>
        <div className={styles.artist}>{artist}</div>
      </div>

      <div className={styles.media}>
        <Tooltip title={'Previous Playlist'}>
          <IconButton aria-label="Previous Playlist" onClick={previousPlaylist}>
            <NavigateBeforeIcon fontSize={'large'} />
          </IconButton>
        </Tooltip>

        <Tooltip title={'Previous Song'}>
          <IconButton aria-label="Previous" onClick={previous}>
            <SkipPreviousIcon fontSize={'large'} />
          </IconButton>
        </Tooltip>

        <Tooltip title={paused ? 'Play' : 'Pause'}>
          <Fab color="primary" aria-label="Play / Pause" onClick={togglePlayer}>
            {paused ? (
              <PlayIcon fontSize={'large'} />
            ) : (
              <PauseIcon fontSize={'large'} />
            )}
          </Fab>
        </Tooltip>

        <Tooltip title={'Next Song'}>
          <IconButton aria-label="Next" onClick={next}>
            <SkipNextIcon fontSize={'large'} />
          </IconButton>
        </Tooltip>

        <Tooltip title={'Next Playlist'}>
          <IconButton aria-label="Next Playlist" onClick={nextPlaylist}>
            <NavigateNextIcon fontSize={'large'} />
          </IconButton>
        </Tooltip>
      </div>
    </Fragment>
  );
};

export default Media;
