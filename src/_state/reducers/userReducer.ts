import { loadState } from 'components/global/Storage/Storage'
import { getUUID } from '_helpers/fn'
import { TTrackPoint } from './adventureReducer'

export type Context = {
    data: TUserData
}


export type TUserData = {
    id: string;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    role: string;
    loggedin: boolean;
    progress: TAdventureProgress[];
}

type TCredentials = {
    username?: string;
    email?: string;
    password: string;
}
type TAdventureProgress = {
    adventureId: string,
    route: TTrackPoint[],
    visited: string[],
}
export enum ActionType {
    LOGIN = 'Login',
    LOGOUT = 'Logout',
    SET_USER = 'Set User',
    CREATE_USER = 'Create User',
    UPDATE_ROUTE = 'Update Route',
    RESET_ROUTE = 'Reset Route',
    LOAD_MAP = 'Load Map',
}
export type Action =
    | { type: ActionType.LOGIN, payload: TCredentials }
    | { type: ActionType.LOGOUT }
    | { type: ActionType.SET_USER, payload: TUserData }
    | { type: ActionType.CREATE_USER, payload: TUserData }
    | { type: ActionType.UPDATE_ROUTE, payload: { id: string, t: TTrackPoint } }
    | { type: ActionType.RESET_ROUTE, payload: { id: string } }
    | { type: ActionType.LOAD_MAP, payload: string }

export const defaultUser: TUserData  = {
        id: 'GUEST',
        email: 'guest@gpsadventure.com',
        username: 'Guest',
        firstname: 'Guest',
        lastname: '',
        role: 'guest',
        loggedin: false,
        progress: [],
    }
export const initialState: Context =
    loadState('user') ||
    {
        data: {...defaultUser}
    }
const defaultAdventureProgress: TAdventureProgress = {
        adventureId: '',
        route: [],
        visited: [],
};
export const reducer = (state = initialState, action: Action): Context => {
    switch (action.type) {
        case ActionType.LOGIN:
            console.log('login', action.payload)
            return state;
        case ActionType.LOGOUT:
            console.log('logout')
            return state;
        case ActionType.SET_USER:
            console.log('setUser')
            return state;
        case ActionType.CREATE_USER:
            const newUser = {...defaultUser, id: getUUID()}
            console.log(newUser)
            return state;
        case ActionType.UPDATE_ROUTE:
            const progO = state.data.progress.find((p) => p.adventureId === action.payload.id) || 
            { ...defaultAdventureProgress, adventureId: action.payload.id }
            // console.log(progO.route.length, state.data.progress.find((p) => p.adventureId === action.payload.id)?.route.length)
            progO.route.push(action.payload.t)
            return progO ? {
                ...state,
                data: {
                    ...state.data,
                    progress: [
                        ...state.data.progress.filter((p) => p.adventureId !== action.payload.id),
                        progO,
                    ]
                }
            } : state
        case ActionType.RESET_ROUTE:
            const p = state.data.progress.find((p) => p.adventureId === action.payload.id) ? { ...state.data.progress.find((p) => p.adventureId === action.payload.id), route: [] as TTrackPoint[] } as TAdventureProgress : false;
            
            return p ? {
                ...state,
                data: {
                    ...state.data,
                    progress: [
                        ...state.data.progress.filter((p) => p.adventureId !== action.payload.id),
                        p
                    ]
                }
            } : state
        case ActionType.LOAD_MAP:
            //AVATAR ROUTE OVERLAPS HOW TO FIX??? 
            // const nr = state.data.progress.find(a => a.adventureId === action.payload) || {...defaultAdventureProgress, adventureId: action.payload}
            // // console.log('user load map', nr.adventureId)
            // return {
            //     ...state,
            //     data: {
            //         ...state.data,
            //         progress: [...state.data.progress.filter(a => a.adventureId !== action.payload),nr]
            //     }
            // };
            const r = state.data.progress.find((p) => p.adventureId === action.payload) ? { ...state.data.progress.find((p) => p.adventureId === action.payload), route: [] as TTrackPoint[] } as TAdventureProgress : false;
            return r ? {
                ...state,
                data: {
                    ...state.data,
                    progress: [
                        ...state.data.progress.filter((p) => p.adventureId !== action.payload),
                        r
                    ]
                }
            } : state
        default:
            return state
    }
}
export default reducer;



