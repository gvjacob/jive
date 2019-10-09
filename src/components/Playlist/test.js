import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Playlist from '.';

describe('Playlist', () => {
  let toggle;

  beforeEach(() => {
    toggle = jest.fn();
  });

  it('renders', () => {
    const { getByTestId } = render(
      <Playlist playlist={{ name: 'Latin: Rumba' }} toggle={toggle} selected />,
    );

    expect(getByTestId('Playlist')).toBeInTheDocument();
  });

  it('renders playlist name', () => {
    const playlist = { name: 'Latin: Rumba', images: [{ url: '' }] };
    const { getByText, container } = render(
      <Playlist playlist={playlist} toggle={toggle} selected />,
    );

    expect(container.getElementsByTagName('img')).toHaveLength(1);
    expect(getByText(playlist.name)).toBeInTheDocument();
  });

  it('renders playlist image if found', () => {
    const url = 'image-url';
    const playlist = { name: 'Latin: Rumba', images: [{ url }] };
    const { container } = render(
      <Playlist playlist={playlist} toggle={toggle} selected />,
    );

    expect(container.querySelector(`img[src="${url}"]`)).toBeInTheDocument();
  });

  it('renders playlist image if found', () => {
    const url = 'image-url';
    const playlist = { name: 'Latin: Rumba', images: [{ url }] };
    const { container } = render(
      <Playlist playlist={playlist} toggle={toggle} selected />,
    );

    expect(container.querySelector(`img[src="${url}"]`)).toBeInTheDocument();
  });

  it('calls toggle with id when clicked', () => {
    const id = 'playlist-id';
    const playlist = { id, name: 'Latin: Rumba' };
    const { container } = render(
      <Playlist playlist={playlist} toggle={toggle} selected />,
    );

    fireEvent.click(container.querySelector('button'));
    expect(toggle).toHaveBeenCalledWith(id);
  });
});
