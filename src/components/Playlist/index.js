import React from 'react';
import { get, isEmpty } from 'lodash';
import cn from 'classnames';

import styles from './styles.css';

const Playlist = ({ className, playlist }) => {
  const name = playlist.name;
  const images = get(playlist, 'images', []);
  const displayImage = isEmpty(images) ? null : get(images, 1, images[0]).url;

  return (
    <div className={cn(className)}>
      <img className={styles.image} src={displayImage} alt={name} />
      <h2 className={styles.title}>{name}</h2>
    </div>
  );
};

export default Playlist;
