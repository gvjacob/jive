import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Media from '.';

describe('Media', () => {
  it('renders', () => {
    const { getByTestId } = render(<Media />);
    expect(getByTestId('Media')).toBeInTheDocument();
  });

  it('renders track name and artist, and playlist name', () => {
    const props = {
      name: 'California Dreamin',
      artist: 'José Feliciano',
      playlistName: 'Latin: Rumba',
    };
    const { getByText } = render(<Media {...props} />);

    Object.values(props).forEach((prop) => {
      expect(getByText(prop)).toBeInTheDocument();
    });
  });

  it('renders play button when paused', () => {
    const props = {
      name: 'California Dreamin',
      artist: 'José Feliciano',
      playlistName: 'Latin: Rumba',
      paused: true,
    };

    const { getByTitle, queryByTitle } = render(<Media {...props} />);
    expect(getByTitle('Play')).toBeInTheDocument();
    expect(queryByTitle('Pause')).toBeNull();
  });

  it('renders pause button when not paused', () => {
    const props = {
      name: 'California Dreamin',
      artist: 'José Feliciano',
      playlistName: 'Latin: Rumba',
      paused: false,
    };

    const { getByTitle, queryByTitle } = render(<Media {...props} />);
    expect(getByTitle('Pause')).toBeInTheDocument();
    expect(queryByTitle('Play')).toBeNull();
  });

  it('calls all action functions when corresponding media control button is clicked', () => {
    const props = {
      next: jest.fn(),
      previous: jest.fn(),
      nextPlaylist: jest.fn(),
      previousPlaylist: jest.fn(),
      togglePlayer: jest.fn(),
    };

    const titles = {
      next: 'Next Song',
      previous: 'Previous Song',
      nextPlaylist: 'Next Playlist',
      previousPlaylist: 'Previous Playlist',
      togglePlayer: 'Play',
    };

    const { getByTitle } = render(<Media {...props} />);

    Object.entries(props).map(([key, fn]) => {
      const title = titles[key];
      fireEvent.click(getByTitle(title));
      expect(fn).toHaveBeenCalled();
    });
  });
});
