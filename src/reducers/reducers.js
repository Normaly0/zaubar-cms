const defaultState = {
    window: "login",
    authenticated: false,
    token: '',
    data: []
}

const START = "START";
const AUTHENTICATION = "AUTHENTICATION";
const DATA = "DATA"

function mainReducer (state = defaultState, action) {
    switch(action.type) {
        case START:
            return {
                ...state,
                window: action.value
            }
        case AUTHENTICATION:
            return {
                ...state,
                authenticated: action.value
            }
        case DATA:
            return {
                ...state,
                data: action.value
            }
        default:
            return {
                ...state
            }
    }
}

export default mainReducer;