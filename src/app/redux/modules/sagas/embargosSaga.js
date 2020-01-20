import {
    call, fork, put, take, takeEvery, all
} from 'redux-saga/effects';
import axios from 'axios';
import {
    GET_EMBARGOS_ASIGNADOS, GET_EMBARGOS_CONFIRMADOS,GET_EMBARGOS_POR_CONFIRMAR, GET_EMBARGOS_ALL
} from '../../constants/EmbargosConst';
import {
getEmbargosConfirmadosSuccess, getEmbargosPorConfirmarSuccess, getEmbargosAsignadosSuccess, getEmbargosAllSuccess
}from '../../actions/embargosAction'

function* getEmbargosConfirmadosSaga(payload) {
    console.log('obteniendo embargos confirmados');
    const config = {
        headers: {
          Authorization: 'Bearer ' + payload.token,
          Accept: 'application/json',
        },
        params:{
            'estadoEmbargo':'CONFIRMADO' 
        }
      };
    const data= yield axios.get('https://bancow.finseiz.com/api/v1/embargos/list', config)
        .then(response => response)
        .catch(err => err.response)
        switch (data.status) {
            case 200:
                yield put(getEmbargosConfirmadosSuccess(data.data))
                break;
        
            default:
                break;
        }
      console.log(data);
    
}
function* getEmbargosSinConfirmarSaga(payload) {
    console.log('obteniendo embargos sin confirmar');
    const config = {
        headers: {
          Authorization: 'Bearer ' + payload.token,
          Accept: 'application/json',
        },
        params:{
            'estadoEmbargo':'SIN_CONFIRMAR' 
        }
      };
    const data= yield axios.get('https://bancow.finseiz.com/api/v1/embargos/list', config)
        .then(response => response)
        .catch(err => err.response)
        switch (data.status) {
            case 200:
                yield put(getEmbargosPorConfirmarSuccess(data.data))
                break;
        
            default:
                break;
        }
      console.log(data);
    
}
function* getEmbargosAsignadosSaga(payload) {
    console.log('obteniendo embargos asignados');
    const config = {
        headers: {
          Authorization: 'Bearer ' + payload.token,
          Accept: 'application/json',
        },
        params:{
            'assignedTo':payload.user
        }
      };
    const data= yield axios.get('https://bancow.finseiz.com/api/v1/embargos/list', config)
        .then(response => response)
        .catch(err => err.response)
        switch (data.status) {
            case 200:
                yield put(getEmbargosAsignadosSuccess(data.data))
                break;
        
            default:
                break;
        }
      console.log(data);
    
}
function* getEmbargosAllSaga(payload){
    console.log('obteniendo embargos all');
    const config = {
        headers: {
          Authorization: 'Bearer ' + payload.token,
          Accept: 'application/json',
        },
      };
    const data= yield axios.get('https://bancow.finseiz.com/api/v1/embargos/list', config)
        .then(response => response)
        .catch(err => err.response)
        switch (data.status) {
            case 200:
                yield put(getEmbargosAllSuccess(data.data))
                break;
        
            default:
                break;
        }
      console.log(data);
}


function* embargosRootSaga() {
    yield all([
        takeEvery(GET_EMBARGOS_CONFIRMADOS, getEmbargosConfirmadosSaga),
        takeEvery(GET_EMBARGOS_POR_CONFIRMAR, getEmbargosSinConfirmarSaga),
        takeEvery(GET_EMBARGOS_ASIGNADOS, getEmbargosAsignadosSaga),
        takeEvery(GET_EMBARGOS_ALL, getEmbargosAllSaga),
        
       
    ])
}

const embargosSagas = [
    fork(embargosRootSaga),
];

export default embargosSagas