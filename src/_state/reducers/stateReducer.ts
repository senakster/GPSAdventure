import { latLng } from "leaflet";

type Context = {
    count: number;
    center: {lat: number, lng: number};
    follow: boolean;
    fetch: boolean;
    centerOnAvatar: boolean;
    position: L.LatLng
}

export enum ActionType {
    INCREMENT = 'Increment',
    DECREMENT = 'Decrement',
    RESET = 'Reset',
    SET_CENTER = 'Set Center',
    TOGGLE_FOLLOW = 'Toggle Follow',
    FETCH_AVATAR = 'Fetch Avatar',
    CENTER_ON_AVATAR = 'Center on Avatar',
    SET_POSITION = 'Set Position of Avatar'
}
export type Action =
    | { type: ActionType.INCREMENT }
    | { type: ActionType.DECREMENT }
    | { type: ActionType.RESET }
    | { type: ActionType.SET_CENTER, payload: L.LatLng}
    | { type: ActionType.TOGGLE_FOLLOW }
    | { type: ActionType.FETCH_AVATAR }
    | { type: ActionType.CENTER_ON_AVATAR }
    | { type: ActionType.SET_POSITION, payload: L.LatLng }

export const initialState: Context = {
    count: 0, 
    center: {lat: 55.6, lng: 12.6},
    follow: false,
    fetch: false,
    centerOnAvatar: false,
    position: latLng(55.6,12.6),
}
// EVENT TYPEGUARD
function isLatLng(event: { lat: number, lng: number } | any): event is { lat: number, lng: number } {
    const e = event as { lat: number, lng: number };
    return e.lat !== undefined &&
    e.lng !== undefined
}

export const reducer = (state: Context = initialState, action: Action): Context => {

    switch (action.type) {
        case ActionType.INCREMENT:
            return {
                ...state,
                count: state.count + 1,
            }
        case ActionType.DECREMENT:
            return {
                ...state,
                count: state.count - 1,
            }
        case ActionType.RESET:
            return {
                ...state,
                count: 0,
            }
        case ActionType.SET_CENTER:
            return isLatLng(action.payload) ? {
                ...state,
                center: action.payload,
            } : state
        case ActionType.TOGGLE_FOLLOW:
            return {
                ...state,
                follow: !state.follow
            }
        case ActionType.FETCH_AVATAR:
            return {
                ...state,
                fetch: !state.fetch
            }
        case ActionType.CENTER_ON_AVATAR:
            return {
                ...state,
                centerOnAvatar: !state.centerOnAvatar
            }
        case ActionType.SET_POSITION:
            return {
                ...state,
                position: isLatLng(action.payload) ? action.payload : state.position
            }
        default:
            return state;
            // throw new Error('Not among actions');
    }
}
export default reducer;



