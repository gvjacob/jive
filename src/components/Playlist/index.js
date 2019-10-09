import React from 'react';
import { get, isEmpty } from 'lodash';
import cn from 'classnames';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import styles from './styles.css';

/**
 * Playlist box displaying name and mosaic picture.
 */
const Playlist = ({ className, playlist, selected, toggle }) => {
  const { name } = playlist;
  const images = get(playlist, 'images', []);
  const displayImage = isEmpty(images) ? null : get(images, 1, images[0]).url;

  return (
    <div
      className={cn(styles.card, className, { [styles.selected]: selected })}
      data-testid={'Playlist'}
    >
      <Card onClick={() => toggle(playlist.id)}>
        <CardActionArea>
          <CardMedia
            component={'img'}
            alt={name}
            height={'200px'}
            image={displayImage}
          />
          <CardContent
            className={cn(styles.content, { [styles.selected]: selected })}
          >
            <h2 className={styles.title}>{name}</h2>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default Playlist;
