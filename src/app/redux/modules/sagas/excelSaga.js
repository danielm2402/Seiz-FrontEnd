
import {
    call, fork, put, take, takeEvery, all
} from 'redux-saga/effects';
import axios from 'axios';
import {
    UPLOAD_EXCEL, GET_PREVIEW,LOAD_DEMANDADOS
} from '../../constants/excelConst';
import {
    uploadExcelSuccess, mensajeExcel, getPreview, getPreviewSuccess
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

    const data = yield fetch('https://bancow.finseiz.com/api/v1/embargos/uploadDemandados?idEmbargo=' + payload.id,
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
            yield put(uploadExcelSuccess({ response: 200 }))
            yield put(getPreview(payload.id, payload.token))

            break;
        case 401:
            yield put(auth.actions.logout())
            break;
        default:
            yield put(mensajeExcel('Error al subir el documento'))
            yield put(uploadExcelSuccess({ response: data.status }))
            break;
    }
}

function* getPreviewSaga(payload) {
    console.log('GET PREVIEW')
    const config = {
        headers: {
            'Authorization': 'Bearer ' + payload.token,
        },
    }

    const data = yield  axios.get('https://bancow.finseiz.com/api/v1/embargos/previewFileDemandados?idEmbargo=' + payload.id, config)
        .then(response => response)
        .catch(err => err.response)

        console.log('PREVIEW')
        console.log(data)
    switch (data.status) {
        case 200:
            const columns = data.data.columns.map((item, index)=>{
                return{ key: item.header==""?'NOT_FOUND'+index:item.header, name: item.header, editable: true } 
            })
            const rows= data.data.columns.map((item)=>{
                return item.entries
            })
            console.log('LAS ROWS SON')
            console.log(rows)
            const dataSend= {columns:columns, rows}
            yield put(getPreviewSuccess())
            console.log(columns)
                
            break;

        default:
            break;
    }
    console.log(data)
}

function* loadDemandados(payload){
    console.log('LOAD DEMANDADOS');
    const config = {
        headers: {
            'Authorization': 'Bearer ' + payload.token,
        },
    }

    const data = yield  axios.post('https://bancow.finseiz.com/api/v1/embargos/loadDemandados?idEmbargo=' + payload.id,{

    },config)
        .then(response => response)
        .catch(err => err.response)

    console.log(data)        
}


function* excelRootSaga() {
    yield all([
        takeEvery(UPLOAD_EXCEL, uploadExcelSaga),
        takeEvery(GET_PREVIEW, getPreviewSaga),
        takeEvery(LOAD_DEMANDADOS,loadDemandados)

    ])
}

const excelSagas = [
    fork(excelRootSaga),
];

export default excelSagas