import React from 'react';
import styles from './Error.module.scss';

const Error: React.FC = () => (
  <div className={styles.Error} data-testid={`Errortest`}>
    <div className={styles.message}>
      <h1>Dang!</h1>
      <p>
        The requested ressource cannot be found
      </p>
    </div>
  </div>
);

export default Error;
