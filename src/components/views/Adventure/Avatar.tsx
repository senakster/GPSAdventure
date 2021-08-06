import Button from 'components/ui/Button/Button';
import L, { LatLng, LocationEvent } from 'leaflet';
import React from 'react'
import { Marker, Popup, useMap, Polyline, Tooltip } from 'react-leaflet';
import { throttle } from '_helpers/fn';
import MarkerIcons from '_helpers/leaflet';
import { ActionType, useStateContext } from '_state';
import { TTrackPoint } from '_state/reducers/adventureReducer';
import { IEvent } from '_state/reducers/eventReducer';
import { AccuracyMarker } from './Adventure';

const Avatar: React.FC<any> = () => {
    //ACCESS TO MAP INSTANCE
    const map: L.Map = useMap();

    //LOG MESSAGES
    const { log, dispatch } = useStateContext();

    //GLOBAL ACTION TRIGGER
    const { centerOnAvatar } = useStateContext().state.state

    //GLOBAL STATE DATA
    const { events, user } = useStateContext().state;
    const { avatar, currentAdventure } = useStateContext().state.adventure;
    function setPosition(p: LatLng){
        const time = new Date().getTime();
        tracking && setRoute({ time: time, track: p })
        dispatch && dispatch(
            {
                type: ActionType.MOVE_AVATAR,
                payload: p,
            }
        )
    }
    function setRoute(t: TTrackPoint) {
        // console.log(user.data.progress.find(p => p.adventureId === currentAdventure)?.route.length)
        // console.log(adventure.list.find(p => p.id === currentAdventure)?.name)

        currentAdventure !== '' && dispatch && dispatch(
            {
                type: ActionType.UPDATE_ROUTE,
                payload: {id: currentAdventure, t: t}
            }
        )
    }
    function clearRoute() {
        currentAdventure !== '' && dispatch && dispatch(
            {
                type: ActionType.RESET_ROUTE,
                payload: {id: currentAdventure}
            }
        )
    }
    //LOCAL STATE
    // const [zoom, setZoom] = React.useState(18);
    const [GPSAccuracy, setGPSAccuracy] = React.useState(0)
    const [tracking, setTracking] = React.useState(false);
    const [path, setPath] = React.useState([] as TTrackPoint[]);
    const [follow, setFollow] = React.useState(false);

    /**
     *  OR USE ONE STATE OBJECT 
     *  const [state, setState] = React.useState(
     *  {
     *     GPSAccuracy: 0,
     *     tracking: false,
     *     followAvatar: false,
     *     path: [] as TrackPoint[],
     *  }
     *  )
     */

    React.useEffect(() => {
        setPath(user.data.progress.find(a => a.adventureId === currentAdventure)?.route || [])
    }, [user.data.progress, currentAdventure])
    //AVATAR DOM REFERENCE
    const markerRef = React.useRef(null as any)

    //MAP LOCATE() EVENTLISTENERS
    React.useEffect(() => {
        // console.log('progression')
        // map.zoomIn(zoom)
        map.addEventListener('locationfound', onLocationFound)
        map.addEventListener('locationerror', onLocationError)
        return () => {
            map.removeEventListener('locationfound', onLocationFound)
            map.removeEventListener('locationerror', onLocationError);
        };
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentAdventure, tracking]
    )

    //CONTINOUS LOCATE HOW TO TRACK GPS CONTINOUSLY
    React.useEffect(() => {
        const track = setInterval(() => { tracking && map.locate() }, 4000)
        return () => {
            clearInterval(track)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tracking, currentAdventure])

    //GLOBAL TRIGGER EFFECT
    React.useEffect(() => {
        const marker = markerRef.current
        map.panTo(marker.getLatLng())
    }, [centerOnAvatar, map])



    // React.useEffect(() => {

    // }, [avatar.position])

    function resetAdventure() {
        clearRoute();
    }

    /**
     * handles 'locationFound' event on map
     * @param {LocationEvent} e 
     */
    const onLocationFound = (e: LocationEvent): void => {
        console.log('Location Found')
        setPosition(e.latlng)
        setGPSAccuracy(e.accuracy)
        follow && map.panTo(e.latlng)
        // const time = new Date().getTime();
        // tracking && setRoute([...route, { time: time, track: e.latlng }])
        // tracking && setRoute({ time: time, track: e.latlng })

        // log && log('accuracy', `${e.latlng} ${e.accuracy.toString()} ${JSON.stringify(e.accuracy)}`)
    }

    function onLocationError(e: L.ErrorEvent) {
        console.log('Location Error')
        log && log('Location Error', e.message)
    }

    const updPos = () => {
        const marker = markerRef.current
        const ll = marker.getLatLng()
        marker && setPosition(ll);
        follow && map.panTo(ll)
    }

    const eventHandlers = React.useMemo(
        () => ({
            // dragend() {
            //   updPos();
            // },
            move() {
                updPos();
                throttle(function () {
                    console.log(window.innerWidth);
                    console.log(window.innerHeight);
                }, 100)
            },
        }),
        // Disable lint - controlling rerenders
        // eslint-disable-next-line react-hooks/exhaustive-deps 
        [user.data.progress, tracking, currentAdventure],
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
            new L.LatLng(nextEvent().position.lat, nextEvent().position.lng).distanceTo(avatar.position)
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
                position={avatar.position}
                ref={markerRef} >
                <Popup>
                    <h1>You are here </h1>
                < span > NEXT EVENT: {`${distanceToNext().toFixed(1)} m`} </span><Button label='show next' /><br />
                    < span > Tracking: {tracking.toString()} </span>
                    < Button label={`reset`
                    } onClick={resetAdventure} />
                    <Button label={`locate`} onClick={() => { map.locate() }} />
                    < Button label={`track`} onClick={toggleTracking} />
                </Popup>
                < Tooltip direction='center' offset={[0, 0]} opacity={.8} 
                // permanent 
                >
                    <span>{
                        // `distance to next event: ${distanceToNext().toFixed(1)} m`
                        `${distanceToNext().toFixed(1)} m`
                    }</span>
                    {/* ACCURACY  */}
                    {/* <span>{` ± ${GPSAccuracy.toFixed(1)} m`}</span> */}
                </Tooltip>
            </Marker>
            {tracking && <AccuracyMarker position={avatar.position} accuracy={GPSAccuracy} />}
            {
                <Polyline positions={path.map(r => r.track) || []} />}
        </>
    )
}

export default Avatar;