const defaultState = {
    window: "login",
    authenticated: false,
    dashboard: 'overview',
    data: [],
    files: [],
    user: [],
    dropdown: false,
    loading: false
}

const START = "START";
const AUTHENTICATION = "AUTHENTICATION";
const LOGOUT = "LOGOUT";
const DASHBOARD = "DASHBOARD";
const DATA = "DATA";
const FILES = "FILES"
const USER = "USER";
const DROPDOWN = "DROPDOWN";
const LOADING = "LOADING";

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
        case LOGOUT:
            return {
                authenticated: false,
                data: [],
                user: [],
                files: [],
                window: "login"
            }
        case DASHBOARD:
            return {
                ...state,
                dashboard: action.value
            }
        case LOADING:
            return {
                ...state,
                loading: action.value
            }
        case DATA:
            return {
                ...state,
                data: action.value
            }
        case FILES: 
            return {
                ...state,
                files: action.value
            }
        case USER: {
            return {
                ...state,
                user: action.value
            }
        }
        case DROPDOWN: {
            return {
                ...state,
                dropdown: action.value
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default mainReducer;