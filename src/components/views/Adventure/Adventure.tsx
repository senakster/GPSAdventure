import React from 'react';
import styles from './Adventure.module.scss';
import 'components/ui/Map/leaflet.css';
import { MapContainer, TileLayer, useMap, Circle } from 'react-leaflet';
import { ActionType, useStateContext } from '_state';
import L from 'leaflet';
import Avatar from './Avatar';

const c = {
  lat: 55.674753,
  lng: 12.584722,
}

const Adventure: React.FC = () => {
  const { currentAdventure } = useStateContext().state.adventure
  React.useEffect(() => {
    console.log(currentAdventure);
  }, [currentAdventure]) 
  return (
  <div className={styles.Adventure} data-testid="Adventure">
    <AMap />
  </div>
);
}

export default Adventure;


const AMap: React.FC<any> = () => {
  const { events, adventure } = useStateContext().state;
  console.log(events, adventure);
  const tileset = { 
    light: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    dark: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
  }
  const attribution = {
    light: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    dark: ' & copy; < a href = "https://stadiamaps.com/" > Stadia Maps</a>, & copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> & copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  }
  
  return (
    <div className={styles.AMap} data-testid="AMaptest">
      <MapContainer
        className={styles.mapContainer}
        center={[c.lat, c.lng]}
        zoom={13}
        scrollWheelZoom={true} >
        <TileLayer
          attribution={attribution.dark}
          url={tileset.dark}
          />
        <Avatar />
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

export const AccuracyMarker: React.FC<any> = ({position, accuracy}) => {
  return (
    <Circle
      center={{ lat: position.lat, lng: position.lng }}
      fillColor="blue"
      radius={accuracy} />
  )
}