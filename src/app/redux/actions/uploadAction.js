import * as types from '../constants/UploadConsts';

export const uploadRequest=(array, token)=>({
    type: types.UPLOAD_REQUEST,
    array,
    token
});
export const uploadSuccess=()=>({
    type: types.UPLOAD_REQUEST_SUCCESS,
});
export const uploadFailed=()=>({
    type: types.UPLOAD_REQUEST_FAILED,
});
export const addFile=(file)=>({
    type: types.ADD_FILE,
    file
})
export const updateLoader=()=>({
    type: types.UPDATE_LOADER
})
export const setPositionProcess=(item)=>({
    type: types.SET_POSITION_PROCESS,
    item
})
export const uploadMensaje=(mensaje)=>({
    type: types.UPLOAD_MENSAJE,
    mensaje
})
export const resetMensaje=()=>({
    type: types.RESET_MENSAJE,
    
})




