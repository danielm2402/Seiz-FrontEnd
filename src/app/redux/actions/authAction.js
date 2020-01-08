import * as types from '../constants/authConst';

export const loginWithEmail=(email, password)=>({
    type: types.LOGIN_EMAIL_REQUEST,
    email,
    password
});
export const registerWithEmail=(email, password)=>({
    type: types.REGISTER_WITH_EMAIL,
    email,
    password
});
export const registerWithEmailFailed=(message)=>({
    type: types.REGISTER_WITH_EMAIL_FAILED,
    message
});
export const registerWithEmailSuccess=(message)=>({
    type: types.REGISTER_WITH_EMAIL_SUCCESS,
    message
}); 
export const loginWithEmailFailed=(message)=>({
    type: types.LOGIN_EMAIL_FAILED,
    message 
})
export const loginWithEmailSuccess=(username, token, refreshtoken, expiredTime)=>({
    type:types.LOGIN_EMAIL_SUCCESS,
    username,
    token,
    refreshtoken,
    expiredTime
})
export const logout=(token)=>({
    type: types.LOGOUT,
    token
})
export const logoutSuccess=()=>({
    type: types.LOGOUT_SUCCESS
})