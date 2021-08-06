import React from 'react';
import styles from './Storage.module.scss'
import { useStateContext } from '_state';

const Storage: React.FC = () => {
  // const { dispatch } = useStateContext();
  const { events, adventure } = useStateContext().state;
  const { list, listOrder } = useStateContext().state.events;
  // const {  } = useStateContext().state.adventure;
  /**
   * Load State in const initialState in reducer
   */
  // React.useEffect(() => {
    // loadState('events')
    // console.log(events, ls)
  // }, [])

  React.useEffect(() => {
    saveState('events', events)
  // Disable lint - controlling rerenders
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [list, listOrder])

  React.useEffect(() => {
    saveState('adventure', adventure)
    console.log('save', adventure)
    // Disable lint - controlling rerenders
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [adventure.list])
  return (
    <div className={styles.Storage}>
    <button onClick={clearStorage}>clear storage</button>
    <button name='events' onClick={deleteItem}>clear events</button>
    <button name='adventure' onClick={deleteItem}>clear adventure</button>
    </div>

  );
}

export default Storage;

export const clearStorage = () => {
  localStorage.clear();
}
export const deleteItem= (e: any) => {
  localStorage.removeItem(e.target.name);
}

export const loadState = (cookieName: string) => {
  console.log('Load State: ' + cookieName)
  try {
    const serializedState = localStorage.getItem(cookieName);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (cookieName: string, state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(cookieName, serializedState);
  } catch {
    // ignore write errors
  }
};


