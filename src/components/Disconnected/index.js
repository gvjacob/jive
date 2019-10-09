import React from 'react';
import cn from 'classnames';
import styles from './styles.css';

/**
 * Disconnected from Spotify state with instructions
 * to connect playback to Jive.
 */
const Disconnected = () => {
  return (
    <div className={styles.disconnected} data-testid={'Disconnected'}>
      <div className={styles.title}>
        Connect to <span className={styles.jive}>Jive</span> on your phone
      </div>
      <ol className={styles.instructions}>
        <li>Go to Settings</li>
        <li>Click on Devices > Devices Menu</li>
        <li>
          Connect to <span className={styles.jive}>Jive</span>
        </li>
      </ol>
    </div>
  );
};

export default Disconnected;
