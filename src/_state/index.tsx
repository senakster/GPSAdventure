import React, { useContext, useReducer } from 'react';
import * as State from './reducers/stateReducer';
import * as Event from './reducers/eventReducer';
import * as Adventure from './reducers/adventureReducer';
import * as Messages from './reducers/messageReducer';
// import * as Themes from './reducers/themeReducer.ts'; 

export interface Context {
    state: typeof State.initialState;
    events: typeof Event.initialState;
    adventure: typeof Adventure.initialState;
    messages: typeof Messages.initialState;
    // themes: typeof Themes.initialState;
}

export const ActionType = { 
    ...State.ActionType, 
    ...Event.ActionType, 
    ...Adventure.ActionType, 
    ...Messages.ActionType, 
    // ...Themes.ActionType,

}
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ActionType = State.ActionType 
| Event.ActionType 
| Adventure.ActionType 
| Messages.ActionType 
// | Themes.ActionType

export type Action = {type: ActionType, payload?: any };

// const mockAction: Action = { type: Event.ActionType.ADD_EVENT, payload: {} }
export interface Store {
    state: Context;
    dispatch?: React.Dispatch<Action>;
    log?: (title: string, body: string) => void
}

// Create Store Context
export const initialState: Context = { 
    state: State.initialState, 
    events: Event.initialState,
    adventure: Adventure.initialState,
    messages: Messages.initialState,
    // themes: Themes.initialState,
};
const context = React.createContext<Store>({ state: initialState });

export const useStateContext = () => useContext(context);

export const StateProvider = ({ children }: any) => {
    const combineDispatch = (...dispatches: React.Dispatch<any>[]) => (action: Action) =>
        dispatches.forEach((dispatch) => dispatch(action));

    // Get Reducers
    const [messages, messagesDispatch] = useReducer(Messages.reducer, Messages.initialState);
    const [state, stateDispatch] = useReducer(State.reducer, State.initialState);
    const [events, eventDispatch] = useReducer(Event.reducer, Event.initialState);
    const [adventure, adventureDispatch] = useReducer(Adventure.reducer, Adventure.initialState);
    // const [themes, themesDispatch] = useReducer(Themes.reducer, Themes.initialState);

    // Combine Dispatches
    // LINT-WARNING: React Hook useCallback received a function whose dependencies are unknown. Pass an inline function instead.eslintreact-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const combinedDispatch = React.useCallback(
        combineDispatch(stateDispatch, eventDispatch, adventureDispatch, messagesDispatch, 
            // themesDispatch
            ), 
        [stateDispatch, combineDispatch, adventureDispatch, messagesDispatch, 
            // themesDispatch
        ],
    );

    // Combine States
    const combinedState = React.useMemo(() => (
        { state, events, adventure, messages, 
            // themes
        }
        ), [state, events, adventure, messages, 
            // themes
        ]);

    function log(title: string, body: string) {
        combinedDispatch && combinedDispatch(
            {
                type: ActionType.NEW_MESSAGE,
                payload: {
                    title: title,
                    body: body,
                }
            }
        )
    }
    
    return <context.Provider value={{ state: combinedState, dispatch: combinedDispatch, log: log} } children = { children } />;
}


export const GSIndicator: React.FC = () => {
    const { state } = useStateContext()
    const count = state.state.count;
    return (
        <span>
            { count }
        </span>
    )
}
export const GSTestButton: React.FC  = () => {
        const { dispatch } = useStateContext()
        return (
            <div>
                <button onClick={(e) => { dispatch && dispatch({ type: State.ActionType.INCREMENT }); }}>{ActionType.INCREMENT}</button>
                <button onClick={(e) => { dispatch && dispatch({ type: State.ActionType.DECREMENT }); }}>{ActionType.DECREMENT}</button>
                <button onClick={(e) => { dispatch && dispatch({ type: State.ActionType.RESET }); }}>{ActionType.RESET}</button>
            </div>
        )
}