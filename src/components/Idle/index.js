import React from 'react';
import styles from './styles.css';

/**
 * Idle state (no playlists selected)
 */
const Idle = () => {
  return (
    <div>
      <div className={styles.title}>Select Playlists</div>
      <p className={styles.information}>
        <span className={styles.jive}>Jive</span> will randomize songs from each
        playlist.
      </p>
    </div>
  );
};

export default Idle;
