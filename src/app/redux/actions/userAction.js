import * as types from '../constants/userConst';

export const getUser=(id, token)=>({
    type: types.GET_USER,
    id,
    token
});
export const getUserSuccess=(data)=>({
    type: types.GET_USER_SUCCESS,
    data
});
export const updateUser=(data, token)=>({
    type:types.UPDATE_USER,
    data,
    token
})
export const updateUserSuccess=(data)=>({
    type: types.UPDATE_USER_SUCCESS,
    data
});
export const deleteUser=(id, token)=>({
    type: types.DELETE_USER,
    id,
    token
})
export const deleteUserSuccess=(data)=>({
    type: types.DELETE_USER_SUCCESS,
    data
})
export const addUser=(data)=>({
    type: types.ADD_USER,
    data
})
export const addUserSuccess=(data)=>({
    type:types.ADD_USER_SUCCESS,
    data
})

export const changePassword=(data, token)=>({
    type:types.CHANGE_PASSWORD,
    data,
    token
})
export const newMensaje=(mensaje)=>({
    type:types.NUEVO_MENSAJE,
    mensaje
})
export const resetMensaje=()=>({
    type: types.RESET_MENSAJE
})
