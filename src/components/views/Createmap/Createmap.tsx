import React from 'react';
import styles from './Createmap.module.scss';
import Map from 'components/ui/Map/Map.lazy'
import Events from 'components/ui/Events/Events';
import Button from 'components/ui/Button/Button';
import { ActionType, useStateContext } from '_state';
import { IEvent } from '_state/reducers/eventReducer';



const Createmap: React.FC = () => {

  return (
    <div className={styles.Createmap} data-testid={`Createmaptest`}>
      <MapSelect />
      <MapSave />
      <div className={styles.content}>
        <div className={styles.mapContainer}>
          <Map />
        </div>
        <div className={styles.eventsContainer}>
          <Events />
        </div>
      </div>
    </div>
  );
}

export default Createmap;

export const MapSelect: React.FC = () => {
  // const { dispatch } = useStateContext();
  const { adventure } = useStateContext().state;
  const { currentAdventure } = useStateContext().state.adventure;
  // const [ CAEvents, setCAEvents ] = React.useState([] as IEvent[])

  React.useEffect(() => {
    const nca = adventure.list.find((a) => a.id === currentAdventure);
    console.log(nca)
  }, [currentAdventure])

  function loadMap(e: any) {
    console.log(e.target);
  }
  function handleChange(e: any) {
    console.log(e.target);
  }

  return (
    <div className={styles.mapSelect}>
      <select onChange={handleChange}>
        {adventure.list.map((a, i) => 
          <option key={i} value={a.id}>{`${a.name} ${a.lastUpdate && `[${new Date(a.lastUpdate).toLocaleString()}]`}`}</option>
          )}
      </select>
      <Button label={`Load Map`} onClick={loadMap} />
    </div>
  )
}

const MapSave: React.FC = () => {
  const [ state, setState] = React.useState({title: 'New Map'})
  const { dispatch } = useStateContext();
  const { events } = useStateContext().state

  function handleInputChange(e: any) {
    setState({...state, [e.target.name]: e.target.value})
  }
  function saveMap() {
    dispatch && dispatch({
      type: ActionType.SAVE_MAP,
      payload: {name: state.title, list: events.list, listOrder: events.listOrder}
    })
    console.log(state.title, events)
  }
  return (
  <div className={styles.mapSave}>
      <input type="text" name={`title`} value={`${state.title}`} onChange={handleInputChange}/>
      <Button label={`save`} onClick={saveMap}/>
  </div>)
}