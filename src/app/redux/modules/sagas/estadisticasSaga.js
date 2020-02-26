
import {
    call, fork, put, take, takeEvery, all
} from 'redux-saga/effects';
import axios from 'axios';
import { CONTEO_EMBARGOS, CONTEO_EMBARGOS_SUCCESS, STATS_USER, STATS_USER_SUCCESS, STATS_GENERAL, STATS_GENERAL_SUCCESS } from '../../constants/estadisticasConst'
import {getConteoEmbargosSuccess } from '../../actions/estadisticasAction'
import * as auth from "../../../store/ducks/auth.duck";
function* conteoEmbargosSaga(payload) {
    console.log('OBTENIENDO contengo embargos saga...');
    const config = {
        headers: {
            Authorization: 'Bearer ' + payload.token,
            'Content-Type': 'application/json'
        },
    };
    const data = yield axios.get('https://bancow.finseiz.com/api/v1/embargos/count', config)
        .then(response => response)
        .catch(error => error.response)
    const data1 = yield axios.get('https://bancow.finseiz.com/api/v1/embargos/count?estadoEmbargo=SIN_CONFIRMAR', config)
        .then(response => response)
        .catch(error => error.response)
    const data2 = yield axios.get('https://bancow.finseiz.com/api/v1/embargos/count?estadoEmbargo=CONFIRMADO', config)
        .then(response => response)
        .catch(error => error.response)
    const data3 = yield axios.get('https://bancow.finseiz.com/api/v1/embargos/count?assignedTo='+payload.user, config)
        .then(response => response)
        .catch(error => error.response)
    const datos = {
        total: data.data,
        PorConfirmar: data1.data,
        confirmados: data2.data,
        asignados: data3.data
    }

    yield put(getConteoEmbargosSuccess(datos))
    console.log(datos)

}

function* userRootSaga() {
    yield all([
        takeEvery(CONTEO_EMBARGOS, conteoEmbargosSaga),

    ])
}

const userSagas = [
    fork(userRootSaga),
];

export default userSagas