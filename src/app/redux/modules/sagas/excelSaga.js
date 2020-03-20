
import {
    call, fork, put, take, takeEvery, all
} from 'redux-saga/effects';
import axios from 'axios';
import {
    UPLOAD_EXCEL, GET_PREVIEW,LOAD_DEMANDADOS
} from '../../constants/excelConst';
import {
    uploadExcelSuccess, mensajeExcel, getPreview, getPreviewSuccess,loadDemandadosSuccess
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
            yield put(mensajeExcel('Error al subir el documento, código '+data.status))
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
                return{ key: item.header==""?'NOT_FOUND'+index:item.header, name: item.header, editable: true, position:index } 
            })
            const rows= data.data.columns.map((item)=>{
                return item.entries
            })
            console.log('LAS ROWS SON')
            console.log(rows)
            let files=[]
            for (let index = 0; index < rows[0].length; index++) {
                files.push({EXPEDIENTE:rows[0][index],NOMBRES:rows[1][index], DOCUMENTO:rows[2][index], VALOR:rows[3][index],})
                
            }
            console.log('LAS FILAS TRANS SON:')
            console.log(files)
            const dataSend= {columns:columns, rows:files, normal: data.data.columns}
            yield put(getPreviewSuccess(dataSend))
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

    let obj={}
    for (const prop in payload.data) {
        if(prop=='tipo'){
            obj={...obj,'tipo-id':payload.data[prop]}
        }
        else{
            obj={...obj,[prop]:payload.data[prop]}
        }
        
      }
      console.log(obj)
    const data = yield  axios.post('https://bancow.finseiz.com/api/v1/embargos/loadDemandados?idEmbargo=' + payload.id,{
        keysHeaders: obj
    },config)
        .then(response => response)
        .catch(err => err.response)

    console.log(data)   
    switch (data.status) {
        case 200:
            yield put(loadDemandadosSuccess())
            break;
    
        default:
            break;
    }    
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