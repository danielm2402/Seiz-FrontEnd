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
    bodyFormData.append('prueba',payload.array); 
    const config = {
        headers: {            
            Accept: 'application/json',
        
        }
    };
    console.log(payload.token)
    const data = yield axios({
        method: 'post',
        url: 'https://bancow.finseiz.com/api/v1/embargos/upload',
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data', 'Authorization':payload.token }
        })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response.response);
        });
    
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