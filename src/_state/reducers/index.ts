import stateReducer from './stateReducer'
import eventReducer from './eventReducer'
import adventureReducer from './adventureReducer'

const reducers = {
    state: stateReducer,
    events: eventReducer,
    adventure: adventureReducer,
}
export default reducers