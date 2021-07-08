/** UNUSED FOR NOW  */

import { loadState } from 'components/global/Storage/Storage'
import { themes } from '_themes'

type Context = {
    theme: string;
}

export enum ActionType {
    CHANGE_THEME = 'Change Theme',

}
export type Action =
    | { type: ActionType.CHANGE_THEME, payload: string}



export const initialState: Context =
    loadState('themes') ||
    {
        theme: themes[0].name,
    }


export const reducer = (state = initialState, action: Action): Context => {
    switch (action.type) {
        case ActionType.CHANGE_THEME:
            return {
                ...state,
                theme: action.payload
            }
        default:
            return state
    }
}
export default reducer;



