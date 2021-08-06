import React from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './Header.module.scss';
import { history } from '_helpers'




const Header: React.FC<any> = (props) => {
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  })

  const [state, setState] = React.useState(
    {
      scrollY: 0,
      up: false,
      collapse: false,
    }
  )
  function handleScroll(e: Event) {
    // console.log(state.scrollY > window.scrollY)
    // console.log(state.scrollY === window.scrollY)

    setState(
      { ...state,
        scrollY: window.scrollY,
        up: state.scrollY > window.scrollY,
        collapse: true
      }
    )
    // console.log('scroll', e)
  }
  return (
    <div className={`${styles.Header} ${styles[props.variant]} ${state.collapse ? styles.collapse : ''}`} data-testid={`Headertest`} 
    // {...props}
    >
    {!props.title && 'Header Component'}
    <div 
    className={styles.bg} 
    style={props.backgroundImage ? {backgroundImage: `url(${props.backgroundImage})`} : {}}>
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
