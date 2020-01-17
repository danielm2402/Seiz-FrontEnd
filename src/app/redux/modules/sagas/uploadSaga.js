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

function* uploadSaga(payload) {
    console.log('upload desde saga...');
    console.log(payload.array)
    var bodyFormData = new FormData();
    bodyFormData.append('files',payload.array[0]); 
    const config = {
        headers: {  
            Authorization: 'Bearer ' + payload.token,   
        }
    };
    const data= yield axios.post('https://bancow.finseiz.com/api/v1/embargos/upload',bodyFormData, config)
    .then(response=>console.log(response))
    .catch(error=>console.log(error.response))
    console.log(data)
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