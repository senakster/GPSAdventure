import Button from 'components/ui/Button/Button';
import L, { LocationEvent } from 'leaflet';
import React from 'react'
import { Marker, Popup, useMap, Polyline, Tooltip } from 'react-leaflet';
import MarkerIcons from '_helpers/leaflet';
import { useStateContext } from '_state';
import { TTrackPoint } from '_state/reducers/adventureReducer';
import { IEvent } from '_state/reducers/eventReducer';
import { AccuracyMarker } from './Adventure';

const Avatar: React.FC<any> = () => {
    const map: L.Map = useMap();
    const { log } = useStateContext();
    const { events } = useStateContext().state;
    const { centerOnAvatar } = useStateContext().state.state
    const { avatar } = useStateContext().state.adventure;
    const [position, setPosition] = React.useState(avatar.position)
    const [GPSAccuracy, setGPSAccuracy] = React.useState(0)
    // const [zoom, setZoom] = React.useState(18);
    const [tracking, setTracking] = React.useState(false);

    const [route, setRoute] = React.useState([] as TTrackPoint[]);

    const markerRef = React.useRef(null as any)

    React.useEffect(() => {
        // map.zoomIn(zoom)
        map.addEventListener('locationfound', onLocationFound)
        map.addEventListener('locationerror', onLocationError)
        return () => {
            map.removeEventListener('locationfound', onLocationFound)
            map.removeEventListener('locationerror', onLocationError);

        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tracking, route])

    React.useEffect(() => {
        const marker = markerRef.current
        map.panTo(marker.getLatLng())
    }, [centerOnAvatar, map])

    React.useEffect(() => {
        const track = setInterval(() => { tracking && map.locate() }, 4000)
        return () => {
            clearInterval(track)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tracking])

    React.useEffect(() => {

    }, [position])

    function resetAdventure() {
        setRoute([]);
    }

    /**
     * handles 'locationFound' event on map
     * @param {LocationEvent} e 
     */
    const onLocationFound = (e: LocationEvent): void => {
        e && setPosition(e.latlng)
        e && setGPSAccuracy(e.accuracy)
        map.panTo(e.latlng)
        const time = new Date().getTime();
        tracking && setRoute([...route, { time: time, track: e.latlng }])
        // log && log('accuracy', `${e.latlng} ${e.accuracy.toString()} ${JSON.stringify(e.accuracy)}`)
    }

    function onLocationError(e: L.ErrorEvent) {
        log && log('Location Error', e.message)
    }

    const updPos = () => {
        const marker = markerRef.current
        const ll = marker.getLatLng()
        marker && setPosition(ll);
        map.panTo(ll)
        const time = new Date().getTime();
        tracking && setRoute([...route, { time: time, track: ll }])
    }

    const eventHandlers = React.useMemo(
        () => ({
            // dragend() {
            //   updPos();
            // },
                move() {
                updPos();
            },
        }),
        // Disable lint - controlling rerenders
        // eslint-disable-next-line react-hooks/exhaustive-deps 
        [route, tracking],
    )

    function nextEvent() {
        // const nid = events.listOrder.filter((id) =>
        //   !progress.map((p) => p.id).includes(id)
        // )[0]
        const nid = events.listOrder[0]
        const ne = events.list.find((e) => e.id === nid)
        return ne as IEvent
    }
    function distanceToNext(): number {
        return nextEvent() ?
            new L.LatLng(nextEvent().position.lat, nextEvent().position.lng).distanceTo(position)
            : 20000000
    }
    function toggleTracking(): void {
        setTracking(!tracking)
    }
    return (<>
            <Marker
                draggable={true}
                eventHandlers={eventHandlers}
                icon={MarkerIcons.avatar.regular}
                position={position}
                ref={markerRef} >
                <Popup>
                    <h1>You are here </h1>
                    < span > NEXT EVENT: {`${distanceToNext().toFixed(1)} m`} </span><Button label='show' /> <br />
                    < span > Tracking: {tracking.toString()} </span>
                    < Button label={`reset`
                    } onClick={resetAdventure} />
                    <Button label={`locate`} onClick={() => { map.locate() }} />
                    < Button label={`track`} onClick={toggleTracking} />
                </Popup>
                < Tooltip direction='center' offset={[0, 0]} opacity={.8} permanent >
                    <span>{
                        // `distance to next event: ${distanceToNext().toFixed(1)} m`
                        `${distanceToNext().toFixed(1)} m`
                    }</span>
                    {/* ACCURACY  */}
                    {/* <span>{` ± ${GPSAccuracy.toFixed(1)} m`}</span> */}
                </Tooltip>
            </Marker>
            {tracking && <AccuracyMarker position={position} accuracy={GPSAccuracy} />}
            {
                tracking && <Polyline positions={route.map((r) => r.track)} />}
        </>
    )
}

export default Avatar;