import React from 'react';
import styles from './Events.module.scss';
import { useStateContext } from '_state'
import { defaultEventData, IEventMedia } from '_state/reducers/eventReducer'
import { ActionType } from '_state'
import Button from 'components/ui/Button/Button';
import { isValidHttpUrl } from '_helpers';

const Events: React.FC<any> = () => {
  const { dispatch } = useStateContext();
  const { events } = useStateContext().state;
  const { position } = useStateContext().state.state;


  const [active, setActive] = React.useState(null as number | null);

  function handleOnFlyTo(e: any) {
    dispatch && dispatch({
      type: ActionType.SET_CENTER,
      payload: JSON.parse(e.target.value)
    })
  }

  function customize(e: any) {
    const id = e.target.value;
    dispatch && dispatch({
      type: ActionType.SET_UPDATE,
      payload: id,
    })
    dispatch && dispatch({
      type: ActionType.SET_CENTER,
      payload: JSON.parse(e.target.dataset.position)
    })
  }

  function reorder(id: string, dir: number) {
    dispatch && dispatch({
      type: ActionType.REORDER_LIST,
      payload: { id: id, direction: dir }
    })
  }

  function newEvent() {
    dispatch && dispatch({
      type: ActionType.ADD_EVENT,
      payload: { ...defaultEventData, position: position }
    })
  }
  return (
    <div className={styles.Events} data-testid="Eventstest">
      <ul className={styles.eventList}>
        <Button onClick={newEvent} data-testid={`newEventBtn`} label='+Event' />
        {events.listOrder.map(
          (id, i) => {
            const e = events.list.find((e) => e.id === id)
            return e ? (
              <li key={id}
                onClick={() => setActive(i)}
                onMouseEnter={() => {
                  dispatch && dispatch({
                    type: ActionType.ACTIVATE,
                    payload: id,
                  })
                  /**Center map on event on mouseenter */
                  // dispatch && dispatch({
                  //   type: ActionType.SET_CENTER,
                  //   payload: e.position
                  // })
                }}
                onMouseLeave={() => {
                  dispatch && dispatch({
                    type: ActionType.ACTIVATE,
                    payload: '',
                  })
                }}
              >
                <div className={`${styles.controls} ${active === i || events.updateId === e.id ? styles.active : ''}`}
                  onMouseLeave={() => setActive(null)}
                >
                  <span>{`${i + 1}. ${e.title}`}
                  </span>
                  <ul className={styles.container}>
                    <li><button title="Edit Event" value={e.id} data-position={JSON.stringify(e.position)} onClick={customize}>
                      &#x1F6E0; {/*customize*/}
                    </button></li>
                    <li><button title="Locate Event" value={JSON.stringify(e.position)} onClick={handleOnFlyTo}>
                      &#x2316; {/*locate*/}
                    </button></li>
                    <li><button title="Delete Event" onClick={() => {
                      dispatch && dispatch(
                        { type: ActionType.REMOVE_EVENT, payload: e.id }
                      )
                    }} style={{ color: 'red' }}>&#x2716; {/**delete &#x2672; (recycle)*/}</button></li>
                    <li><button title="Move Up" onClick={() => { reorder(id, 1) }}>&#8679; {/**up */}</button></li>
                    <li><button title="Move Down" onClick={() => { reorder(id, -1) }}>&#8681;</button></li>
                  </ul>
                </div>
              </li>
            ) : null
          }
        )}

      </ul>
      <EventDetails />
    </div>
  );
}

export const EventDetails: React.FC = () => {
  const { updateId, list } = useStateContext().state.events
  const { dispatch } = useStateContext();
  const [ mediaView, setMediaView] = React.useState(false)
  React.useEffect(() => {
    const initData = list.find((e) => e.id === updateId) || defaultEventData;
    setData(initData)
  }, [updateId, list])
  // const initData: IEvent = {
  //   id: -1,
  //   position: { lat: 55, lng: 12 },
  //   title: 'New Event',
  //   media: [],
  //   description: '',
  //   links: [],
  // }

  function toggleMediaView() {
    console.log('toggle media')
    setMediaView(!mediaView)
  }

  const initData = list.find((e) => e.id === updateId);
  const [data, setData] = React.useState(
    initData || defaultEventData
  );

  function handleTextInput(e: any) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setData({ ...data, [name]: value });
  }

  function updateEvent(): void {
    dispatch && dispatch({
      type: ActionType.UPDATE_EVENT,
      payload: data,
    })
  }

  function doneEditing(): void {
    updateEvent()
    dispatch && dispatch({
      type: ActionType.SET_UPDATE,
      payload: '',
    })
  }

  return (
    data.id !== -1 ? <div className={styles.details} data-testid={`Eventdetailstest`}>
      {/* <button onClick={() => dispatch && dispatch({
        type: ActionType.ADD_EVENT,
        payload: { ...data },
      })}>Create Event</button> */}
      <h3>{data.title}</h3>
      <ul>
        <li><label>Title:</label><input name="title" value={data.title} onChange={handleTextInput} /></li>
        <li><label>Description:</label><textarea name="description" value={data.description} placeholder="Description" onChange={handleTextInput} /></li>
        <li className={styles.liPosition}><label>Position:</label>
          <span >lat: {data.position.lat}</span>
          <span>lng: {data.position.lng}</span>
        </li>
        <li className={styles.liMedia}><label>Media: </label>
          <button onClick={toggleMediaView}>Edit Media</button>
          {data.media.map((m) => <span key={m.url}><a href={m.url} rel="noreferrer" target="_blank">{m.type}</a></span>)}
        </li>
        <li><label>Links: </label>
          {data.links.map((m) => <span key={m.url}><a href={m.url} rel="noreferrer" target="_blank">{m.name}</a></span>)}
        </li>
        <li><button onClick={updateEvent}>Update</button></li>
        <li><button onClick={doneEditing}>Done</button></li>
      </ul>
      <MediaDetails id={data.id} active={mediaView} toggleMediaView={toggleMediaView}/>
    </div> : null
  )
}

type MDProps = {
  id: string | number;
  active: boolean;
  toggleMediaView: () => void
}
const MediaDetails: React.FC<MDProps> = ({ id, active, toggleMediaView }) => {
  // const { dispatch } = useStateContext();
  const { list } = useStateContext().state.events
  const [media, setMedia] = React.useState([] as IEventMedia[])

  React.useEffect(() => {
    const data = list.find((e) => e.id === id)?.media as IEventMedia[];
    setMedia(data)
  },[list, id]) 
  
  function handleInput(e: any) {
    const { name, value, dataset } = e.target;
    const nv = [...media];
    nv.splice(dataset.index, 1, { ...media[dataset.index], [name]: value })
    nv && setMedia(nv) 
  }
  const mediaTypes = [
    'video', 'audio', 'image'
  ]

  function addMedia () {
    setMedia([...media, {type: 'video', url: ''}])
  }

  function updateMedia() {
    let valid = true;
    media?.forEach((m) => {
        valid = valid && m && ( m.url === '' || isValidHttpUrl(m.url) ) 
    })
    media && console.log(valid, media)
  }
  function deleteMediaByIndex(e: any) {
    const index = parseInt(e.target.value);
    const m = [...media];
    m.splice(index, 1);
    setMedia(m);
  }

  return (
    <div className={`${styles.mediaDetails} ${active ? styles.active : ''}`}>
      <h3>{list.find((e) => e.id === id)?.title} media</h3>
      <ul>
        {media?.map((m, i) =>
          <li key={i}>
            <span>{i}</span>
            <label>type: 
              <select name={`type`} data-index={i} defaultValue={m.type}
                onChange={handleInput}
              >
              {mediaTypes.map((t) =>
                <option key={t}>{t}</option>
              )}
            </select>
            </label>
            <label>URL: <input name={`url`} data-index={i} value={m.url} onChange={handleInput}></input></label>
            <Button onClick={deleteMediaByIndex} value={i} variant='warning' label={'🗑'}/>
          </li>
        )}
        <li>
          <Button variant="primary" onClick={addMedia} label="Add" />
          <Button variant="primary" onClick={updateMedia} label="Update"/>
          <Button onClick={toggleMediaView} label={`x`}/>
        </li>
      </ul>
    </div>
  )
}
export default Events;
