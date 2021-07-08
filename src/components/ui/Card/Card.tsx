import React from 'react';
import styles from './Card.module.scss';

const Card: React.FC = () => (
  <div className={styles.Card} data-testid="Card">
    Card Component
  </div>
);

export default Card;
