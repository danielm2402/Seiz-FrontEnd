import {
    call, fork, put, take, takeEvery, all
} from 'redux-saga/effects';
import axios from 'axios';
import {
    UPLOAD_REQUEST
} from '../../constants/UploadConsts';
import {
uploadFailed, uploadSuccess
}from '../../actions/uploadAction'
import * as auth from "../../../store/ducks/auth.duck";

function* uploadSaga(payload) {
    console.log('upload desde saga...');
    console.log(payload.array)
    var bodyFormData = new FormData();
    bodyFormData.append('files',payload.array[0]); 
    const config = {
        headers: {  
            Authorization: 'Bearer ' + payload.token, 
            'Content-Type':'application/pdf'
        }
    };
    const data= yield axios.post('https://bancow.finseiz.com/api/v1/embargos/upload',bodyFormData, config)
    .then(response=>response)
    .catch(error=>error.response)
    console.log(data)
    switch (data.status) {
        case 200:
            yield put(uploadSuccess())
            
        break;
        case 401:
            yield put(auth.actions.logout())
            break;
    
        default:
            
            yield put(uploadFailed())
            break;
    }
}


function* uploadRootSaga() {
    yield all([
        takeEvery(UPLOAD_REQUEST, uploadSaga),
       
    ])
}

const uploadSagas = [
    fork(uploadRootSaga),
];

export default uploadSagas