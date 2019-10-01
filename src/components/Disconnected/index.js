import React from 'react';
import cn from 'classnames';
import styles from './styles.css';

const Disconnected = () => {
  return (
    <div className={styles.disconnected}>
      <div className={styles.title}>
        Connect to <span className={styles.jive}>Jive</span> on your Spotify
        client
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
