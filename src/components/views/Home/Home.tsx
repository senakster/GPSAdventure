import React from 'react';
import styles from './Home.module.scss';

  // .then((response) => response.body.getReader() )

const Home: React.FC = () => {

 return (
    <div className={styles.Home} data-testid={`Hometest`}>
     Home Component
  </div>
);
}

export default Home;
