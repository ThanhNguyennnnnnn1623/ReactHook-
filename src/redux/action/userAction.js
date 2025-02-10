export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS'
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
export const UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'


export const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: data
    }
}

export const doLogout = () => {
    return {
        type: USER_LOGOUT_SUCCESS,
    }
}

export const updateSuccessToken = (data) => {
    return {
        type: UPDATE_ACCESS_TOKEN,
        payload: data
    }
}

export const updateSuccessProfile = (data) => {
    return {
        type: UPDATE_PROFILE,
        payload: data
    }
}