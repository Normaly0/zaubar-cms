const defaultState = {
    window: "login",
    authenticated: false,
    token: ''
}

const START = "START";
const TOKEN = "TOKEN";

function mainReducer (state = defaultState, action) {
    switch(action.type) {
        case START:
            return {
                ...state,
                window: action.value
            }
        case TOKEN:
            return {
                ...state,
                token: action.value,
                authenticated: true
            }
        default:
            return {
                ...state
            }
    }
}

export default mainReducer;