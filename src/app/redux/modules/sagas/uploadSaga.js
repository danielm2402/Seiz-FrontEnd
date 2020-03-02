import {
    call, fork, put, take, takeEvery, all
} from 'redux-saga/effects';
import axios from 'axios';
import {
    UPLOAD_REQUEST
} from '../../constants/UploadConsts';
import {
    uploadFailed, uploadSuccess,uploadMensaje
} from '../../actions/uploadAction'
import * as auth from "../../../store/ducks/auth.duck";

function* uploadSaga(payload) {
    console.log('upload desde saga...');
    console.log(payload.array[0])
    var bodyFormData = new FormData();
    bodyFormData.append('files', payload.array[0], 'file.pdf');
    console.log(bodyFormData)

    const instance = axios.create({
        baseURL: 'https://bancow.finseiz.com/api/v1',
        timeout: 50000,
        transformRequest: [(data, headers) => {
            delete headers.common["Content-Type"]
            return data
        }]
      });

    const data=yield fetch('https://bancow.finseiz.com/api/v1/embargos/upload', 
      {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + payload.token,
            
        },
        body: bodyFormData
      }
    )
    .then(response => response.json())
    .catch(error => error.response.json())
   
    /* const data = yield instance.post('/embargos/upload', {files:bodyFormData}, {
        headers: {
            'Authorization': 'Bearer ' + payload.token,

            //'Content-Type': 'multipart/form-data'
            
            "Content-Type": `multipart/form-data; boundary=${bodyFormData._boundary}`,

            //'content-Type':'multipart/mixed'
            
        }
        ,
        data: {},
    })
        .then(response => response)
        .catch(error => error.response) */
    console.log(data)
    switch (data.status) {
        case 200:
            yield put(uploadMensaje('Documentos subidos con éxito'))
            yield put(uploadSuccess())

            break;
        case 401:
            yield put(auth.actions.logout())
            break;

        default:
            yield put(uploadMensaje('Error al subir documentos, contacte al administrador'))
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