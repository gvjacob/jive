import React from 'react';
import { render } from '@testing-library/react';

import Player from '.';
import { SpotifyContext } from '../../contexts';

describe('Player', () => {
  it('renders', () => {
    const { getByTestId } = render(
      <SpotifyContext.Provider
        value={{
          setAccessToken: jest.fn(),
          getUserPlaylists: async () => [],
        }}
      >
        <Player playlists={[]} setDocumentTitle={() => {}} />
      </SpotifyContext.Provider>,
    );
    expect(getByTestId('Player')).toBeInTheDocument();
  });
});
