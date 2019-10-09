import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, wait } from '@testing-library/react';

import DJ from '.';
import { SpotifyContext } from '../../contexts';

describe('DJ', () => {
  it('renders', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <SpotifyContext.Provider
          value={{
            setAccessToken: jest.fn(),
            getUserPlaylists: async () => [],
          }}
        >
          <DJ />
        </SpotifyContext.Provider>
      </BrowserRouter>,
    );
    expect(getByTestId('DJ')).toBeInTheDocument();
  });
});
