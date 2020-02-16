
import {
    call, fork, put, take, takeEvery, all
} from 'redux-saga/effects';
import axios from 'axios';
import {
    OBTENER_DEMANDADOS_TABLE
} from '../../constants/boundingConst';
import {
    obtenerDemandadosTableSuccess
} from '../../actions/boundingAction'

function* obtenerDemandadosTableSaga(payload) {
    console.log('OBTENIENDO DEMANDADOS TABLA saga...');
    console.log(payload.vertices)
    const config = {
        headers: {
            Authorization: 'Bearer ' + payload.token,
            'Content-Type': 'application/json'
        },
        params: {
            'idEmbargo': 20021000171
        }
    };
    const data = yield axios.post('https://bancow.finseiz.com/api/v1/demandados/seiz/extractTable', {
        
        verticalLines:[],
        pageNumber:0,
        boundingPoly:{vertices:payload.vertices},
        keyColumns:payload.columns
    }, config)
        .then(response => response)
        .catch(error => error.response)
    console.log(data)
}


function* boundingRootSaga() {
    yield all([
        takeEvery(OBTENER_DEMANDADOS_TABLE, obtenerDemandadosTableSaga),

    ])
}

const boundingSagas = [
    fork(boundingRootSaga),
];

export default boundingSagas