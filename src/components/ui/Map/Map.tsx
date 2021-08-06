import React from 'react';
import './leaflet.css';
import '_helpers/icons.scss';
import styles from './Map.module.scss';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L, { LatLngExpression, LocationEvent } from 'leaflet';
import { ActionType, useStateContext } from '_state';
import { defaultEventData, IEvent, IEventMedia } from '_state/reducers/eventReducer';
import MarkerIcons from '_helpers/leaflet';
import { mapTilesets } from '_themes'
import { truncate, parse } from '_helpers/fn';

const c = {
  lat: 55.674753,
  lng: 12.584722,
}

type MapProps = {
  testing?: boolean;
  adventure?: boolean | IEvent[] | any; 
}
const Maps: React.FC<MapProps> = ({testing}) => {

  
  // React.useEffect(() => {
  //   console.log('list/listOrder update')
  //   setMarkers([]);
  //   setTimeout(() => {setMarkers(list)}, 100)
  // },[list, listOrder])
  // const center = map.locate()
  return (
    <div className={styles.Map} data-testid="Maptest">
      <MapContainer
        className={styles.mapContainer}
        center={[c.lat, c.lng]}
        zoom={13}
        scrollWheelZoom={true} >
        <TileLayer
          // {...mapTilesets.dark}
          {...mapTilesets.light}

        />
        <EventLayer />
        {<AvatarMarker /> }
        <MapControls />
        {!testing && <Path />}
      </MapContainer>
    </div>

  );
}

const EventLayer: React.FC = () => {
  const { list, listOrder } = useStateContext().state.events
  
  // const [markers, setMarkers] = React.useState([] as IEvent[])
  // React.useEffect(() => {
  //   forceUpdate()
  // },[list, listOrder])


  // // HACK FORCE UPDATE MARKERS
  // function forceUpdate() {
  //   setMarkers([]);
  //   setTimeout(() => {setMarkers(list)}, 10)
  // }
  
  return (
    <>
      {list.map((e, i) =>
        <EventMarker
          key={e.id}
          event={e}
          id={e.id}
          order={{ p: listOrder.indexOf(e.id as string), of: list.length }}
        />)
      }
    </>
  )
}

/**
 * triggers plain js DOM-manipulation
 * @returns {null}
 */
const MapControls: React.FC = (): null => {
  const {dispatch} = useStateContext()
  const map = useMap();
  React.useEffect(() => {
    const control = new L.Control({ position: 'topright' })
    control.onAdd = () => {
      const div = L.DomUtil.create("div", "controls");

      //FETCH BUTTON
      const fetchBtn = L.DomUtil.create("button", "fetch avatar");
      fetchBtn.innerHTML = 'Center Avatar'
      fetchBtn.addEventListener('click', (e) => {
        dispatch && dispatch({
          type: ActionType.FETCH_AVATAR,
        })
      })

      //LOCATE BUTTON
      const locateBtn = L.DomUtil.create("button", "locate avatar");
      locateBtn.innerHTML = 'Find Avatar'
      locateBtn.addEventListener('click', (e) => {
        dispatch && dispatch({
          type: ActionType.CENTER_ON_AVATAR,
        })
      })

      //FLY HOME BUTTON
      const myLocationBtn = L.DomUtil.create("button", "locate avatar");
      myLocationBtn.innerHTML = 'Fly Home'
      myLocationBtn.addEventListener('click', (e) => {
        //triggers Avatar Marker event listener with 'locationfound/locationerror'
        map.locate();
      })

      //APPEND
      div.append(locateBtn)
      div.append(fetchBtn)
      div.append(myLocationBtn)
      return div;
    }
    control.addTo(map);
  
  // Disable lint - controlling rerenders
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  },[])
  return null;
  // return (
  //   <div className={`${styles.controls} leaflet-controls`}>
  //     <div className={styles.bg}></div>
  //     <h4>CONTROLS:</h4>
  //     <button className={styles.fetchAvatar} onClick={() => {
  //       dispatch && dispatch({
  //         type: ActionType.FETCH_AVATAR,
  //       })
  //     }}>Fetch Avatar</button>
  //   </div>
  // )
}

const AvatarMarker: React.FC = (): JSX.Element => {
  const { dispatch } = useStateContext()
  const { fetch } = useStateContext().state.state
  const { centerOnAvatar, position } = useStateContext().state.state
  
  function setPosition(position: L.LatLng) {
    dispatch && dispatch({
      type: ActionType.SET_POSITION,
      payload: position,
    })
  }

  const [message, setMessage] = React.useState('');
  const markerRef = React.useRef(null as any)
  const map = useMap()

  const { center } = useStateContext().state.state;

  React.useEffect(() => {
    map.flyTo(center, 16)
  // Disable lint - controlling rerenders
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [center])

  React.useEffect(() => {
    map.locate()
    map.addEventListener('locationfound', lf)
    return () => {
      map.removeEventListener('locationfound', lf)
    };
  // Disable lint - controlling rerenders
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [])

  React.useEffect(() => {
    fetchAvatar();
  // Disable lint - controlling rerenders
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [fetch])

  React.useEffect(() => {
    const marker = markerRef.current
    marker && map.flyTo(marker.getLatLng(), 14)
  // Disable lint - controlling rerenders
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [centerOnAvatar])

  function fetchAvatar() {
    const position = map.getCenter();
    position && setPosition(position)
  }

  const lf = (e: LocationEvent) => {
    e && setPosition(e.latlng)
    map.flyTo(e.latlng, 15)
    setMessage('accuracy' + e.accuracy.toString())
  }

  function newEvent() {
    const position = markerRef.current.getLatLng();
    dispatch && dispatch({
      type: ActionType.ADD_EVENT,
      payload: { ...defaultEventData, position: position },
    })
  }
  const eventHandlers = React.useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        marker && setPosition(marker.getLatLng())
      },
    }),
  // Disable lint - controlling rerenders
  // eslint-disable-next-line react-hooks/exhaustive-deps 
    [],
  )

  return (
    <Marker
      icon={MarkerIcons.avatar.regular}
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      <NewEventPopup position={position} newEvent={newEvent} message={message} />
    </Marker>
  )
}


const EventMarker: React.FC<any> = ({ event, order }) => {
  const { dispatch } = useStateContext()
  const { active, updateId } = useStateContext().state.events
  // const list = useStateContext().state.events.list
  // const [event, setEvent] = React.useState(list.find((e) => e.id === id) as IEvent)
  const [position, setPosition] = React.useState(event.position)
  const [draggable, setDraggable] = React.useState(true)
  const markerRef = React.useRef(null as any)
  const map = useMap();

  // React.useEffect(() => {
  //   console.log('event updated')
  //   setEvent(list.find((e) => e.id === id) as IEvent)
  // },[list, id])

  function handleOnFlyTo() {
    map.flyTo(event.position, map.getZoom(), {
      duration: 2
    });
  }
  function handleOnDelete() {
    dispatch && dispatch({
      type: ActionType.REMOVE_EVENT,
      payload: event.id,
    })
  }

  function customize(e: any): void {
    const id = e.target.value;
    dispatch && dispatch({
      type:ActionType.SET_UPDATE,
      payload: id,
    })
  }

  function updateEventPosition() {
    const marker = markerRef.current
    const ll = marker.getLatLng()
    // console.log(ll)
    marker && setPosition(ll)
    dispatch && dispatch({
      type: ActionType.UPDATE_EVENT,
      payload: { ...event, position: ll }
    })
  }
  const eventHandlers = 
  {
    ...{
      move() {
        updateEventPosition()
      },
    },
    /** Memoized part */
    ...React.useMemo(
        () => ({
            dragstart() {},
            dragend() {},
          }),[])
  }

  const iconType = 
  order.of > 1 ?
  order.p === 0 ? 'start' :
  order.p >= order.of - 1 ? 'treasure' : 
  'exclamation' : 
  'exclamation';

  const icon = active === event.id || updateId === event.id ? 
  MarkerIcons[iconType].active : 
  MarkerIcons[iconType].regular
  return (
    <Marker
      draggable={draggable}
      icon={icon}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      <Popup>
        <h3>{event.title}</h3>
        <p>{parse(truncate(event.description, 40, false))}</p>
        <ul>
          {event.media.map((m: IEventMedia, i: number) => <MediaInstance key={i} {...m}/>)}
        </ul>
        <button title="Center Map" onClick={handleOnFlyTo}>⌖</button>
        <button title="Edit Event" value={event.id} onClick={customize}>&#x1F6E0; {/**hammer and wrench */}</button>
        <button title="Delete Event" onClick={handleOnDelete} style={{ color: 'red' }}>✖</button>
        <button title="Toggle Movability" style={{ color: draggable ? 'green' : 'red' }} onClick={() => setDraggable(!draggable)}>{draggable ? '✥' : '🔒'}</button>
      </Popup>
    </Marker>
  )
}

const MediaInstance: React.FC<any> = ({title, type, url}) => {
  return <li><a href={url} target="_blank" rel="noreferrer">{title || type}</a></li>
  // switch(type) {
  //   case 'youtube': 
  //     return <li><a href={url} target="_blank" rel="noreferrer">{title || type}</a></li>
  //   case 'video': 
  //     return <li><a href={url} target="_blank" rel="noreferrer">{title || type}</a></li>
  //   case 'audio':
  //     return <li><a href={url} target="_blank" rel="noreferrer">{title || type}</a></li>
  //   case 'image':
  //     return <li><a href={url} target="_blank" rel="noreferrer">{title || type}</a></li>
  //   case 'HTML':
  //     return <li><a href={url} target="_blank" rel="noreferrer">{title || type}</a></li>
  //   default:  
  //     return null;
  // }
}
const NewEventPopup: React.FC<any> = ({ position, newEvent, message }) => {
  return (
    <Popup minWidth={90}>
      <span>
        Add Event at this location {JSON.stringify(position)}
        {message}
        <button onClick={newEvent}>+</button>
      </span>
    </Popup>
  )
}


const Path: React.FC = () => {
  const { events } = useStateContext().state
    const latLng: LatLngExpression[] = events.listOrder
    // .filter((id) => id !== events.draggingId)
    .map(
    (id) => {
      const e = events.list.find((e) => e.id === id) as IEvent
      return new L.LatLng(e.position.lat, e.position.lng)
    }
  )
  return (
    <Polyline positions={latLng}/>
  )
}

export default Maps;