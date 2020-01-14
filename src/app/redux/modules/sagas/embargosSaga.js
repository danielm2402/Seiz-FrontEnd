import {
    call, fork, put, take, takeEvery, all
} from 'redux-saga/effects';
import axios from 'axios';
import {
    GET_EMBARGOS
} from '../../constants/EmbargosConst';
import {
uploadFailed, uploadSuccess
}from '../../actions/uploadAction'

function* getEmbargosSaga(payload) {
    console.log('obteniendo embargos');
    console.log(payload.tipo)
    const config = {
        headers: {
          Authorization: 'Bearer ' + payload.token,
          Accept: 'application/json',
        }
      };
    const data= yield axios.get('https://bancow.finseiz.com/api/v1/embargos/list',config)
        .then(response => response)
        .catch(err => err.response)
      console.log(data);
    
}


function* embargosRootSaga() {
    yield all([
        takeEvery(GET_EMBARGOS, getEmbargosSaga),
       
    ])
}

const embargosSagas = [
    fork(embargosRootSaga),
];

export default embargosSagas