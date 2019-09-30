import React, { useRef, useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { getRandomInt } from '../../utils';

const usePlaylists = (playlists, spotify) => {
  const [index, setIndex] = useState(null);

  useEffect(() => {
    if (!isEmpty(playlists)) {
      const { id, uri } = playlists[index];
      spotify.getPlaylistTracks(id).then(({ items }) => {
        const rand = getRandomInt(items.length);
        spotify.play({ context_uri: uri, offset: { position: rand } });
      });
    }
  }, [index]);

  const next = () => {
    setIndex(index >= playlists.length - 1 ? 0 : index + 1);
  };

  const previous = () => {
    setIndex(index <= 0 ? 0 : index - 1);
  };

  return [previous, next];
};

export default usePlaylists;
