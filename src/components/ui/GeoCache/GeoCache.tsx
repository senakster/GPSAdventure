import MediaView from 'components/ui/MediaView/MediaView';
import React from 'react';
import { ActionType, useStateContext } from '_state';
import { IEvent } from '_state/reducers/eventReducer';
import Button from '../Button/Button';
// import { useStateContext } from '_state';
import styles from './GeoCache.module.scss';

const GeoCache: React.FC = () => {
  const { dispatch } = useStateContext();
  const { currentAdventure, list } = useStateContext().state.adventure;
  const [state, setState] = React.useState(
    {event: null as IEvent | null | undefined}
  )
  React.useEffect(() => {
    console.log(list.find((a) => a.id === currentAdventure))
    setState({
      ...state,
      event: list.find((a) => a.id === currentAdventure)?.cache.event
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentAdventure,list])

  function closeCache () {
    dispatch && dispatch({
      type: ActionType.TOGGLE_CACHE,
      payload: {id: currentAdventure}
    })
  }
  return (
    <div className={styles.GeoCache} data-testid="GeoCache">
      <Button variant={`fixed-br`} label={`x`} onClick={closeCache} />
      <div className={styles.wrapper}>
      <div className={styles.bg}></div>
        <div className={styles.content}>
          <h1>{state.event?.title}</h1>
          <p>{state.event?.description}</p>
          {/* {JSON.stringify(state.event?.media)} */}
          {
            state.event?.media.map((m,i) =>
            // null
              <MediaView key={i} {...m} />
            )
          }
          {/* {JSON.stringify(state)} */}
          {/* <MediaView type={`youtube`} url={`https://youtu.be/gR8KGam3m9Q?t=60`} /> */}
      </div>
    </div>
    </div>
  );
}
export default GeoCache;
