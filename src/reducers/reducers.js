const defaultState = {
    window: "login"
}

const SIGNIN = "SIGNIN";
const LOGIN = "LOGIN";

function mainReducer (state = defaultState, action) {
    switch(action.type) {
        case SIGNIN:
            return {
                ...state,
                window: "signin"
            }
        case LOGIN:
            return {
                ...state,
                window: "login"
            }
        default:
            return {
                ...state
            }
    }
}

export default mainReducer;