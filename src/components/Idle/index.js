import React from 'react';
import styles from './styles.css';

/**
 * Idle state (no playlists selected), instruct
 * users to select playlists.
 */
const Idle = () => {
  return (
    <div data-testid={'Idle'}>
      <div className={styles.title}>Select Playlists</div>
      <p className={styles.information}>
        <span className={styles.jive}>Jive</span> will randomize songs from each
        playlist.
      </p>
    </div>
  );
};

export default Idle;
