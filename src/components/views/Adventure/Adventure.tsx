import React from 'react';
import styles from './Adventure.module.scss';
import 'components/ui/Map/leaflet.css';
import '_helpers/icons.scss';
import { MapContainer, TileLayer, useMap, Circle, Marker, Popup } from 'react-leaflet';
import { ActionType, useStateContext } from '_state';
import L from 'leaflet';
import Avatar from './Avatar';
import { mapTilesets } from '_themes';
import Button from 'components/ui/Button/Button';
import { IEvent } from '_state/reducers/eventReducer';
import GeoCache from 'components/ui/GeoCache/GeoCache';
import MarkerIcons from '_helpers/leaflet';

const c = {
  lat: 55.674753,
  lng: 12.584722,
}

const Adventure: React.FC = () => {
  const { dispatch } = useStateContext()
  const { adventure } = useStateContext().state
  // React.useEffect(() => {
  //   console.log(state.user.data.progress.find(p => p.adventureId === adventure.currentAdventure)?.route)
  // }, [state.user.data.progress, adventure.currentAdventure])

  // React.useEffect(() => {
  //   console.log(adventure.avatar);
  // }, [adventure.avatar])

  function abort() {
    dispatch && dispatch({
      type: ActionType.LOAD_MAP,
      payload: '',
    })
  }
  return (
    <div className={styles.Adventure} data-testid="Adventure">
      {adventure.list.find((a) => a.id === adventure.currentAdventure)?.cache?.active && <GeoCache />}
      {<span>{adventure.list.find((a) => a.id === adventure.currentAdventure)?.name || 'Select Adventure'}</span>}
      {adventure.currentAdventure !== '' ? <><Button label="Abort" onClick={abort} /><AMap /></> : <AdventureSelect />}
    </div>
  )
}

export default Adventure;

const AdventureSelect: React.FC = () => {
  const { dispatch } = useStateContext()
  const { adventure } = useStateContext().state;
  const [caid, setCaid] = React.useState(
    adventure.list.find((a) => a.id === adventure.currentAdventure)?.id ||
      adventure.list[0] ? adventure.list[0].id
      : ''
  )

  // React.useEffect(() => {
  //   // console.log(adventure.currentAdventure)
  // },[adventure.currentAdventure])

  // React.useEffect(() => {
  //   console.log(caid)
  // }, [caid])

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

  function handleChange(e: any) {
    setCaid(e.target.value)
  }

  return (
    <div className={styles.adventureSelect}>
      <select onChange={handleChange} value={caid}>
        {adventure.list.map((a, i) =>
          <option key={i} value={a.id}>{`${a.name} ${a.lastUpdate && `[${new Date(a.lastUpdate).toLocaleString()}]`}`}</option>
        )}
      </select>
      <Button label={`Load Map`} onClick={loadMap} />
    </div>
  )
}
const AMap: React.FC<any> = () => {
  // const { events, adventure } = useStateContext().state;
  // console.log(events, adventure);

  return (
    <div className={styles.AMap} data-testid="AMaptest">
      <MapContainer
        className={styles.mapContainer}
        center={[c.lat, c.lng]}
        zoom={13}
        scrollWheelZoom={true} >
        <TileLayer
          // attribution={attribution.dark}
          // url={tileset.dark}
          // {...mapTilesets.dark}
          {...mapTilesets.light}

        />
        <Avatar />
        <EventLayer />
        <MapControls />
        {/* {events.list.filter} */}
      </MapContainer>
    </div>
  )
}

/**
 * triggers plain js DOM-manipulation
 * @returns {null}
 */
const MapControls: React.FC = (): null => {
  const { dispatch } = useStateContext()
  const map = useMap();
  React.useEffect(() => {
    const control = new L.Control({ position: 'topright' })
    control.onAdd = () => {
      const div = L.DomUtil.create("div", "controls");

      //LOCATE BUTTON
      const locateBtn = L.DomUtil.create("button", "locate avatar");
      locateBtn.innerHTML = 'Find Avatar'
      locateBtn.addEventListener('click', (e) => {
        dispatch && dispatch({
          type: ActionType.CENTER_ON_AVATAR,
        })
      })

      //APPEND
      div.append(locateBtn)
      return div;
    }
    control.addTo(map);
    // Disable lint - controlling rerenders
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [])
  return null;
}

export const AccuracyMarker: React.FC<any> = ({ position, accuracy }) => {
  return (
    <Circle
      center={{ lat: position.lat, lng: position.lng }}
      fillColor="dodgerblue"
      radius={accuracy} />
  )
}

const EventLayer: React.FC = () => {
  const { dispatch } = useStateContext();
  const { events, adventure } = useStateContext().state
  // const { position } = useStateContext().state.adventure.avatar

  const [state, setState] = React.useState(
    {
      nearThreshold: 100,
      cache: {active: false, event: null as IEvent | null}
    }
  )
  function nextEvent() {
    /**
     * Check for globalstate.user.progress
     */
    // const nid = events.listOrder.filter((id) =>
    //   !progress.map((p) => p.id).includes(id)
    // )[0]
    const nid = events.listOrder[0]
    const ne = events.list.find((e) => e.id === nid)
    return ne as IEvent
  }
  function openCache(e: IEvent) {
    dispatch && dispatch(
      {
        type: ActionType.TOGGLE_CACHE,
        payload: {
          id: adventure.currentAdventure,
          event: e,
        }
      }
    )
  }
  // function closeCache() {
  //   setState({
  //     ...state,
  //     cache: {
  //       ...state.cache,
  //       active: false,
  //     }
  //   })
  // }

  return (
    <>
      {/* {state.cache.active && state.cache.event && <GeoCache closeCache={closeCache} {...state.cache.event}/>} */}
      {events.list.map((e, i) => {
        const llPos = new L.LatLng(e.position.lat, e.position.lng)
        const isNear = llPos.distanceTo(adventure.avatar.position) <= state.nearThreshold;
        const isNext = e.id === nextEvent().id;
        return isNext ? 
        (
          <Marker
            icon={isNear ? MarkerIcons.cache.active : MarkerIcons.cache.regular}
            key={e.id}
            position={{ ...e.position }}
          >
            <Popup>
              {llPos.distanceTo(adventure.avatar.position)}
              {isNear && <Button label='Open Cache' onClick={() => {openCache(e)}}/>}
            </Popup>
          </Marker>
        ) : null
      }
      )
      }
    </>
  )
}