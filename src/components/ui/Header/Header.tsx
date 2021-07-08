import React from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './Header.module.scss';
import { history } from '_helpers'




const Header: React.FC<any> = (props) => {
  return (
    <div className={`${styles.Header} ${styles[props.variant]}`} data-testid={`Headertest`} {...props}>
    {!props.title && 'Header Component'}
    <div 
    className={styles.bg} 
    style={props.backgroundImage ? {backgroundImage: props.backgroundImage} : {}}>
    </div>
    <div className={styles.filter}>
    </div>
    <div className={styles.content}>
      <h1 className={styles.title}>{`${props.title}`}</h1>
      {props.navigation && <Navigation history={history} />}
    </div>
  </div>
);
}

export default Header;
