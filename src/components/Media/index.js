import React, { Fragment } from 'react';

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

/**
 * Media information and controls including play, pause,
 * next/prev song, next/prev playlist.
 *
 */
const Media = ({
  name,
  artist,
  next,
  previous,
  nextPlaylist,
  previousPlaylist,
  paused = true,
  togglePlayer,
  playlistName,
}) => {
  const mediaControls = [
    {
      title: 'Previous Playlist',
      onClick: previousPlaylist,
      $icon: NavigateBeforeIcon,
    },
    {
      title: 'Previous Song',
      onClick: previous,
      $icon: SkipPreviousIcon,
    },
    {
      title: paused ? 'Play' : 'Pause',
      onClick: togglePlayer,
      $component: Fab,
      $icon: paused ? PlayIcon : PauseIcon,
      color: 'primary',
    },
    {
      title: 'Next Song',
      onClick: next,
      $icon: SkipNextIcon,
    },
    {
      title: 'Next Playlist',
      onClick: nextPlaylist,
      $icon: NavigateNextIcon,
    },
  ];

  return (
    <div data-testid={'Media'}>
      <div className={styles.track}>
        <div className={styles.title}>{name}</div>
        <div className={styles.artist}>{artist}</div>
        <div className={styles.playlistName}>{playlistName}</div>
      </div>

      <div className={styles.media}>
        {mediaControls.map((mediaControl, index) => (
          <MediaControlButton key={index} {...mediaControl} />
        ))}
      </div>
    </div>
  );
};

const MediaControlButton = ({
  title,
  $component = IconButton,
  $icon,
  color = 'default',
  onClick,
}) => {
  return (
    <Tooltip title={title}>
      <$component color={color} aria-label={title} onClick={onClick}>
        <$icon fontSize={'large'} />
      </$component>
    </Tooltip>
  );
};

export default Media;
