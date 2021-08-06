import React from 'react';
import styles from './Createmap.module.scss';
import Map from 'components/ui/Map/Map.lazy'
import Events from 'components/ui/Events/Events';
import Button from 'components/ui/Button/Button';
import { ActionType, useStateContext } from '_state';
import { TAdventureProgress } from '_state/reducers/adventureReducer';
import { getUUID } from '_helpers';

const Createmap: React.FC = () => {
  const {state} = useStateContext()
  return (
    <div className={styles.Createmap} data-testid={`Createmaptest`}>
      <span>{state.adventure.list.find(a => a.id === state.adventure.currentAdventure)?.name || 'EDIT MAP'}</span>
      { state.adventure.currentAdventure === '' ? <MapSelect /> : 
      <>
      <MapSave />
      <div className={styles.content}>
        <div className={styles.mapContainer}>
          <Map />
        </div>
        <div className={styles.eventsContainer}>
          <Events />
        </div>
      </div>
      </>
    }
    </div>
  );
}

export default Createmap;

export const MapSelect: React.FC = () => {
  const { dispatch } = useStateContext();
  const { adventure } = useStateContext().state;
  // const [ CAEvents, setCAEvents ] = React.useState([] as IEvent[])

  const [caid, setCaid] = React.useState(
    adventure?.list.find((a) => a.id === adventure.currentAdventure)?.id ||
      adventure.list[0]?.id ? adventure.list[0].id
      : ''
  )

  // React.useEffect(() => {
  //   const nca = adventure.list.find((a) => a.id === adventure.currentAdventure);
  //   // console.log(nca)
  // }, [adventure.list, adventure.currentAdventure])

  function loadMap(e: any) {
    const nm = adventure.list.find((a) => a.id === caid);
    dispatch && dispatch({
      type: ActionType.LOAD_MAP,
      payload: caid,
    })
    nm && dispatch && dispatch({
      type: ActionType.LOAD_EVENTS,
      payload: nm
    })
  }
  function newMap(e: any) {
     dispatch && dispatch({
      type: ActionType.LOAD_MAP,
      payload: getUUID(),
    })
    dispatch && dispatch({
      type: ActionType.CLEAR_EVENTS,
    })
  }
  function handleChange(e: any) {
    setCaid(e.target.value);
  }

  return (
    <div className={styles.mapSelect}>
      <select onChange={handleChange} value={caid}>
        {/* <option value={getUUID()}>Start New Map</option> */}
        {adventure.list.map((a, i) => 
          <option key={i} value={a.id}>{`${a.name} ${a.lastUpdate && `[${new Date(a.lastUpdate).toLocaleString()}]`}`}</option>
          )}
      </select>
      <Button label={`Load Map`} onClick={loadMap} />
      <Button label={`New Map`} onClick={newMap} />
    </div>
  )
}

const MapSave: React.FC = () => {
  let progressionTypes: string[] = [];
  for (const p in TAdventureProgress) {
    progressionTypes = [...progressionTypes, p];
  }

  const { dispatch } = useStateContext();
  const { events, user, adventure } = useStateContext().state

  const [state, setState] = React.useState({ title: adventure.list.find(a => a.id === adventure.currentAdventure)?.name || 'New Map', progression: adventure.list.find(a=>a.id===adventure.currentAdventure)?.progression || progressionTypes[0]})

  function handleInputChange(e: any) {
    setState({...state, [e.target.name]: e.target.value})
  }
  function saveMap() {
    dispatch && dispatch({
      type: ActionType.SAVE_MAP,
      payload: {id: adventure.currentAdventure, name: state.title, progression: state.progression, list: events.list, listOrder: events.listOrder, ownerId: user.data.id}
    })
    // console.log(state.title, events)
  }
  function closeMap() {
    dispatch && dispatch({
      type: ActionType.LOAD_MAP,
      payload: '',
    })
  }
  function deleteMap(id: string) {
    closeMap()
    dispatch && dispatch({
      type: ActionType.DELETE_MAP,
      payload: adventure.currentAdventure,
    })
  }

  return (
  <div className={styles.mapSave}>
      <input type="text" name={`title`} value={`${state.title}`} onChange={handleInputChange}/>
      <select name='progression' value={state.progression} onChange={handleInputChange}>
        {progressionTypes.map((t) => 
          <option key={t} value={t}>{t}</option>
        )}
      </select>
      {/* {JSON.stringify(TAdventureProgress)} */}
      <Button label={`save`} onClick={saveMap}/>
      <Button label='Cancel' onClick={closeMap} />
      <Button label='Delete' onClick={deleteMap} />
  </div>)
}