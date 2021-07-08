import { getUUID, swapPositions } from "_helpers/fn";
import { loadState } from 'components/global/Storage/Storage'
import { LatLng } from "leaflet";

export type IEvent = {
    id: number | string;
    visited?: number | boolean; 
    position: LatLng
    title: string;
    media: IEventMedia[];
    description: string;
    links: IEventLink[];
}

export type IEventMedia = {
    type: 'video' | 'audio' | 'image', 
    url: string,
}
export type IEventLink = {
    name: string,
    url: string,
}
export const defaultEventData: IEvent = {
    id: -1,
    position: new LatLng( 55.6, 12.6 ),
    title: 'New Event',
    media: [
        { type: 'video', url: 'https://www.youtube.com/watch?v=d--QaUXvJOQ'},
        { type: 'audio', url: ''},
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_March_2010-1.jpg'}
    ],
    description: '',
    links: [
        { name: 'link', url: 'https://jasonwatmore.com/post/2020/10/28/react-facebook-how-to-use-the-facebook-sdk-in-a-react-app'}
    ],
}

export type EventData = {
    list: IEvent[];
    // array of event UUIDs
    listOrder: string[];
}
type Context = EventData & {
    active: string;
    updateId: string;
    // draggingId: string | false;
    // newEventTrigger: boolean;
}

export enum ActionType {
    ADD_EVENT = 'Add',
    REMOVE_EVENT = 'Remove',
    UPDATE_EVENT = 'Update',
    ACTIVATE = 'Activate',
    REORDER_LIST = 'Reorder List',
    SET_UPDATE = 'Set Update',
    // DRAG_EVENT = 'Dragging Event'
    // NEW_EVENT = 'New Event'
}
export type Action =
    | { type: ActionType.ADD_EVENT, payload: IEvent }
    | { type: ActionType.REMOVE_EVENT, payload: number | string}
    | { type: ActionType.UPDATE_EVENT, payload: IEvent }
    | { type: ActionType.ACTIVATE, payload: string }
    | { type: ActionType.REORDER_LIST, payload: {id: string, direction: number} }
    | { type: ActionType.SET_UPDATE, payload: string}
    // | { type: ActionType.DRAG_EVENT, payload: string | false }

    // | { type: ActionType.NEW_EVENT }

export const initialState: Context = 
loadState('events') || 
{
    list: [],
    listOrder: [],
    active: '',
    updateId: '',
    // draggingId: false,
    // newEventTrigger: false,
}

// EVENT TYPEGUARD
function isEvent(event: IEvent | any): event is IEvent {
    const e = event as IEvent;
    return e.id !== undefined &&
        e.position !== undefined &&
        e.title !== undefined &&
        e.media !== undefined &&
        e.description !== undefined &&
        e.links !== undefined
}

export const reducer = (state = initialState, action: Action): Context => {
    switch (action.type) {
        case ActionType.ADD_EVENT: 
            const newUUID = getUUID();
            return isEvent(action.payload) ?
            {
                ...state,
                list: [
                    ...state.list,
                    // { ...action.payload, id: nextId(state.list) }
                    { ...action.payload, id: newUUID }
                ],
                listOrder: [...state.listOrder, newUUID ]
            }
            :
            { ...state };
        
        case ActionType.REMOVE_EVENT: {
                    
            return {
                ...state,
                list: [...state.list.filter((e) => e.id !== action.payload)],
                listOrder: [...state.listOrder.filter((i) => i !== action.payload)]
            }
        }
        case ActionType.UPDATE_EVENT:
            return isEvent(action.payload)? 
            {
                ...state,
                list: [...state.list.filter((e) => e.id !== action.payload.id), {...action.payload}]
            } : state
        case ActionType.ACTIVATE:
            return {
                ...state,
                active: action.payload
            }        
        case ActionType.REORDER_LIST:
            const from = state.listOrder.indexOf(action.payload.id);
            const to = from - action.payload.direction;
            const na = to >= 0 && to < [...state.listOrder].length ? swapPositions([...state.listOrder], from, to) : [...state.listOrder]
            return {
                ...state,
                listOrder: na,
            }
        case ActionType.SET_UPDATE:
            return {
                ...state,
                updateId: action.payload
            }
        // case ActionType.DRAG_EVENT:
        //     return {
        //         ...state,
        //         draggingId: action.payload
        //     }
        // case ActionType.NEW_EVENT:
        //     return {
        //         ...state,
        //         newEventTrigger: !state.newEventTrigger
        //     }
        default:
            return state
    }
}
export default reducer;



