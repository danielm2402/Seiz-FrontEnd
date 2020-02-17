
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
import{getDemandadosSuccess} from '../../actions/embargosAction'

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
        pageNumber:(payload.page-1),
        boundingPoly:{vertices:payload.vertices},
        keyColumns:payload.columns
    }, config)
        .then(response => response)
        .catch(error => error.response)
    console.log(data)
    switch (data.status) {
        case 200:
            const vector=data.data.map((item)=>{
                  return JSON.parse(item.content)
            
            })
            var cont=0;
            const vectorEdit= vector.map((item)=>{
                cont=cont+1;
                return{
                    id: cont,
                    nombres:item.nombre,
                    identificacion:item.identificacion,
                    montoAEmbargar:item.monto,
                    tipoIdentificacion:'NO_SELECCIONADO'
                }
            })
            console.log('EL VECTOR EDIT')
            console.log(vectorEdit)
            yield put(getDemandadosSuccess(vectorEdit))
            yield put(obtenerDemandadosTableSuccess(vectorEdit))
            break;
    
        default:
            break;
    }
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