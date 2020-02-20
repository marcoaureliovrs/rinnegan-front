const INITIAL_STATE = {list: []}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ALERTS_FETCHED':
            return { ...state, list: action.payload.data.payload }
        default:
            return state
    }
}