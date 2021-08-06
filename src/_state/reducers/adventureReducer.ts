import { loadState } from 'components/global/Storage/Storage'
import { LatLng, LatLngExpression } from 'leaflet'
import { getUUID } from '_helpers'
import { EventData, IEvent } from './eventReducer'

type TAvatar = {
    position: LatLng;
}

export type TTrackPoint = {
    time: number;
    track: LatLngExpression;
}

export enum TAdventureProgress {
    Ordered = 'Ordered',
    Unordered = 'Unordered',
    Sandbox = 'Sandbox'
}
export type TAdventureCache = {
    active: boolean;
    event: IEvent | null;
}
export type TAdventure = EventData & {
    id: string;
    ownerId: string;
    name: string;
    lastUpdate?: number;
    progression: TAdventureProgress;
    cache: TAdventureCache;
}
type Context = {        
    avatar: TAvatar;
    currentAdventure: string;
    list: TAdventure[] // should be set from database
}

export enum ActionType {
    MOVE_AVATAR = 'Move Avatar',
    SAVE_MAP = 'Save Map',
    LOAD_MAP = 'Load Map',
    DELETE_MAP = 'Delete Map',
    TOGGLE_CACHE = 'Toggle Cache',
    SET_EVENT = 'Set Event'
}
export type Action =
    | { type: ActionType.MOVE_AVATAR, payload: LatLng}
    // | { type: ActionType.SAVE_MAP, payload: EventData & {id: string, name: string, progression: TAdventureProgress, ownerId: string}}
    | { type: ActionType.SAVE_MAP, payload: TAdventure }
    | { type: ActionType.LOAD_MAP, payload: string }
    | { type: ActionType.DELETE_MAP, payload: string }
    | { type: ActionType.TOGGLE_CACHE, payload: {id: string, event: IEvent | undefined} }



const c = {
    lat: 55.674753,
    lng: 12.584722,
}

export const initialState: Context = 
loadState('adventure') || 
{
    avatar: {
        position: {lat: c.lat, lng: c.lng },
    },
    currentAdventure: '',
    list: [], // should be set from database
}

// EventData TYPEGUARD
function isEventData(adventure: EventData | any): adventure is EventData{
    const e = adventure as EventData;
    return e.list !== undefined &&
        e.listOrder !== undefined
}
// TAdventureData TYPEGUARD
function isAdventureData(adventure: EventData | any): adventure is TAdventure {
    const e = adventure as TAdventure;
    return e.list !== undefined &&
        e.listOrder !== undefined &&
        e.id !== undefined &&
        e.name !== undefined &&
        e.ownerId !== undefined
}

function adventureFromEventData (payload: EventData & {id: string, name: string, progression: TAdventureProgress, ownerId: string}): TAdventure {
   return { ...payload, id: payload.id !== '' ? payload.id : getUUID(), name: payload.name, lastUpdate: new Date().getTime(), progression: payload.progression, ownerId: payload.ownerId, cache: { active: false, event: null } }
}
export const reducer = (state = initialState, action: Action): Context => {
    switch (action.type) {
        case ActionType.MOVE_AVATAR:
            return {
                ...state,
                avatar: {
                    ...state.avatar,
                    position: action.payload,
                } 
            }
        case ActionType.SAVE_MAP:
            const na: TAdventure | false = isAdventureData(action.payload)? 
                adventureFromEventData(action.payload) : false
            return na ? 
            { ...state, 
                list: [...state.list.filter((a) => a.id !== na.id), na]
            }
            : state; 
        case ActionType.LOAD_MAP:
            return {
                ...state,
                currentAdventure: action.payload
            }
        case ActionType.DELETE_MAP:
            // console.log(action.payload)
            return {
                ...state,
                list: [...state.list.filter(a => a.id !== action.payload)]
            }
        case ActionType.TOGGLE_CACHE:
            // console.log(action.payload)
            const ua = state.list.find(a => a.id === action.payload.id) as TAdventure
            ua.cache = ua.cache ? ua.cache : {active: false, event: null} 
            ua.cache.event = action.payload.event ? action.payload.event : null;
            console.log(ua)
            return {
                ...state,
                list: [...state.list.filter(a => a.id !== action.payload.id),
                    {...ua, cache: {...ua.cache, active: !ua.cache.active}}
                ]
            }
        default:
            return state
    }
}
export default reducer;



