import React from 'react'
import styles from './Navigation.module.scss'
import { navRoutes } from 'components/global/Router/Router'
import { history } from '_helpers/history'
import Button from '../Button/Button';
import { ActionType, useStateContext } from '_state';

function navigate(event: any): void {
  typeof event.target.value === 'string' && history.push(event.target.value);
}
const Navigation: React.FC<any> = ({history}) => {
  const { dispatch } = useStateContext()
  /** 
   * Rerender on history change
   */
  const [location, setLocation] = React.useState(history.location.pathname)
  React.useEffect( () => {
    history.listen((location: any, action: any) => {
      setLocation(location.pathname)
    })
  // emulate once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  function toggleMessages() {
    dispatch && dispatch({
      type: ActionType.TOGGLE_MESSAGES,
    })
  }
  /* */
  return (
    <div className={styles.Navigation} data-testid="Navigationtest">
    {/* <span>{navRoutes.find((r) => r.path === location)?.name}</span> */}
    <nav>
      <ul className={styles.routes}>
        {navRoutes.map((r) =>
          <li key={r.path} className={`${r.path} ${location === r.path ? styles.active : ''}`}>
            <div className="routes">
              <Button label={r.name} value={r.path} onClick={navigate} />
            </div>
          </li>
        )}
        <li>
            <Button variation={styles.toggleBtn} label={`!`} onClick={toggleMessages} />
        </li>
      </ul>
    </nav>
  </div>
)
}

export default Navigation;
