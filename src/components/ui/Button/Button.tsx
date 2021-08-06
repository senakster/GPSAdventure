import React from 'react';
import styles from './Button.module.scss';

const Button: React.FC<any> = (props) => (
  <button 
  {...props}
    className={`${styles.Button} ${styles[props.variant]} ${styles[props.className]}`}
  aria-pressed="false"
  data-testid="Buttontest">
    {props.label}
  </button>
);

export default Button;
