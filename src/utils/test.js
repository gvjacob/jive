import {
  getAccessTokenFromURL,
  orderPlaylists,
  getRandomInt,
  indexOf,
} from '.';

describe('getAccessTokenFromURL', () => {
  it('access_token if found', () => {
    const accessToken = 'abc';
    expect(
      getAccessTokenFromURL(`https://www.foo.com/?access_token=${accessToken}`),
    ).toEqual(accessToken);
  });

  it('null if not found', () => {
    expect(getAccessTokenFromURL('https://www.foo.com')).toBeNull();
  });
});

describe('orderPlaylists', () => {
  const createPlaylists = (...names) => names.map((name) => ({ name }));

  it('follows the order latin, rhythm, standard, smooth, and open floor', () => {
    const playlists = createPlaylists(
      'foo',
      'standard: waltz',
      'open floor: saturday',
      'latin: samba',
      'rhythm: cha cha',
    );
    const ordered = orderPlaylists(playlists);

    expect(ordered.length).toEqual(playlists.length);
    expect(ordered[0].name).toEqual(playlists[3].name);
    expect(ordered[1].name).toEqual(playlists[4].name);
    expect(ordered[2].name).toEqual(playlists[1].name);
    expect(ordered[3].name).toEqual(playlists[2].name);
    expect(ordered[4].name).toEqual(playlists[0].name);
  });

  it('shifts relevant playlists to the start', () => {
    const playlists = createPlaylists(
      'latin: rumba',
      'foo',
      'latin: samba',
      'open floor: Saturday',
    );
    const ordered = orderPlaylists(playlists);

    expect(ordered.length).toEqual(playlists.length);
    expect(ordered[0].name).toEqual(playlists[0].name);
    expect(ordered[1].name).toEqual(playlists[2].name);
    expect(ordered[2].name).toEqual(playlists[3].name);
    expect(ordered[3].name).toEqual(playlists[1].name);
  });

  it('same list if none are relevant to ballroom', () => {
    const playlists = createPlaylists('foo', 'bar');
    expect(orderPlaylists(playlists)).toEqual(playlists);
  });

  it('empty when empty list', () => {
    expect(orderPlaylists([])).toEqual([]);
  });
});

describe('indexOf', () => {
  it('index if found', () => {
    const options = ['foo', 'bar'];

    expect(indexOf('foo', options)).toEqual(0);
    expect(indexOf('bar', options)).toEqual(1);
  });

  it('ignore case', () => {
    expect(indexOf('foo', ['FOO'])).toEqual(0);
  });

  it('null if not found', () => {
    expect(indexOf('foo', ['bar'])).toBeNull();
  });

  it('null if empty options', () => {
    expect(indexOf('foo', [])).toBeNull();
  });
});

describe('getRandomInt', () => {
  it('returns integer between 0 and given max', () => {
    for (let i = 0; i < 5; i++) {
      const integer = getRandomInt(5);

      expect(integer).toBeGreaterThanOrEqual(0);
      expect(integer).toBeLessThanOrEqual(5);
    }
  });
});
