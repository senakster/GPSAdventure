import { loadState } from 'components/global/Storage/Storage'
import { getUUID } from '_helpers/fn'

export type Context = {
    active: boolean;
    messages: TMessage[];
}

export type TMessage = {
    id: string;
    read?: boolean;
    title: string;
    body: string;
    interactions?: any;
}
export enum ActionType {
    TOGGLE_MESSAGES = 'Toggle Messages',
    NEW_MESSAGE = 'New Message',
    CLEAR_MESSAGES = 'Clear Messages',
    READ_MESSAGE = 'Read Messages'

}
export type Action =
    | { type: ActionType.TOGGLE_MESSAGES }
    | { type: ActionType.NEW_MESSAGE, payload: TMessage}
    | { type: ActionType.CLEAR_MESSAGES }
    | { type: ActionType.READ_MESSAGE, payload: string }



export const initialState: Context =
    loadState('messages') ||
    {
        active: false,
        messages: [],
    }

function isMessage(event: TMessage | any): event is TMessage {
    const e = event as TMessage;
    return e.title !== undefined &&
        e.body !== undefined
}
export const reducer = (state = initialState, action: Action): Context => {
    switch (action.type) {
        case ActionType.TOGGLE_MESSAGES:
            return {...state, 
                active: !state.active 
            }
        case ActionType.NEW_MESSAGE:
            return isMessage(action.payload) ? { ...state, 
                active: true,
                messages: [...state.messages,
                {...action.payload, read: false, id: getUUID()}
                ]
            } : state
        case ActionType.CLEAR_MESSAGES:
            return {
                ...state,
                active: true,
                messages: []
            }
        case ActionType.READ_MESSAGE:
            // console.log([...state.messages].filter((m) => m.id !== action.payload ))

            // const nv = [...state.messages].splice(action.payload, 1)
            // console.log(nv);
            return {
                ...state,
                messages: [...state.messages].filter((m) => m.id !== action.payload),
            }
        default:
            return state
    }
}
export default reducer;



