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
