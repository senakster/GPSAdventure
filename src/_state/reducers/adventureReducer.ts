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

export type TUserAdventureData = {
    id: string;
    events: IEvent[];
    completed: boolean;
    route: TTrackPoint[],
    progress: any[];
}

type Adventure = EventData & {
    id: string;
    name: string;
    lastUpdate?: number;
}
type Context = {        
    avatar: TAvatar;
    currentAdventure: string;
    list: Adventure[] // should be set from database

}

export enum ActionType {
    MOVE_AVATAR = 'Move Avatar',
    SAVE_MAP = 'Save Map'
}
export type Action =
    | { type: ActionType.MOVE_AVATAR}
    | { type: ActionType.SAVE_MAP, payload: EventData & {name: string}}


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
export const reducer = (state = initialState, action: Action): Context => {
    switch (action.type) {
        case ActionType.MOVE_AVATAR:
            console.log('MOVE')
        return state
        case ActionType.SAVE_MAP:
            const na: Adventure | false = isEventData(action.payload)? 
            {id: getUUID(), ...action.payload, name: action.payload.name, lastUpdate: new Date().getTime() } : false
            return na ? 
            { ...state, 
                list: [...state.list.filter((a) => a.id !== na.id), na]
            }
            : state; 
        default:
            return state
    }
}
export default reducer;



