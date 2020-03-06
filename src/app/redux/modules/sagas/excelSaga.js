
import {
    call, fork, put, take, takeEvery, all
} from 'redux-saga/effects';
import axios from 'axios';
import {
    UPLOAD_EXCEL
} from '../../constants/excelConst';
import {
    uploadExcelSuccess, mensajeExcel
} from '../../actions/excelActions'

import * as auth from "../../../store/ducks/auth.duck";


function* uploadExcelSaga(payload) {
console.log('EL EXCEL ES')
     var bodyFormData = new FormData();
        bodyFormData.append('file', payload.data);
  console.log(payload.data)

    const instance = axios.create({
        baseURL: 'https://bancow.finseiz.com/api/v1',
        timeout: 50000,
        transformRequest: [(data, headers) => {
            delete headers.common["Content-Type"]
            return data
        }]
      });

    const data=yield fetch('https://bancow.finseiz.com/api/v1/embargos/uploadDemandados?idEmbargo='+payload.id, 
      {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + payload.token,
           
        },
        body: bodyFormData
      }
    )
    .then(response => response)
    .catch(error => error.response)
   
    console.log(data)
    switch (data.status) {
        case 200:
 
            yield put(mensajeExcel('Excel subido con exito'))
            yield put(uploadExcelSuccess({response:200}))

            break;
        case 401:
            yield put(auth.actions.logout())
            break;
        default:     
            yield put(mensajeExcel('Error al subir el documento'))
            yield put(uploadExcelSuccess({response:data.status}))
            break;
    }
}


function* excelRootSaga() {
    yield all([
        takeEvery(UPLOAD_EXCEL, uploadExcelSaga),

    ])
}

const excelSagas = [
    fork(excelRootSaga),
];

export default excelSagas