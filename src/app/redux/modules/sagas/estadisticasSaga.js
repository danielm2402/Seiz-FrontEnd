
import {
    call, fork, put, take, takeEvery, all
} from 'redux-saga/effects';
import axios from 'axios';
import { CONTEO_EMBARGOS,STATS_RANKING_USER, CONTEO_EMBARGOS_SUCCESS, STATS_USER, STATS_USER_SUCCESS, STATS_GENERAL, STATS_GENERAL_SUCCESS } from '../../constants/estadisticasConst'
import { getConteoEmbargosSuccess } from '../../actions/estadisticasAction'
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
    const data3 = yield axios.get('https://bancow.finseiz.com/api/v1/embargos/count?assignedTo=' + payload.user, config)
        .then(response => response)
        .catch(error => error.response)
    const data4 = yield axios.get('https://bancow.finseiz.com/api/v1/embargos/count?estadoEmbargo=FINALIZADO', config)
        .then(response => response)
        .catch(error => error.response)
        if(data.status==200&&data1.status==200&&data2.status==200&&data3.status==200&&data4.status==200){
            const datos = {
                total: data.data,
                PorConfirmar: data1.data,
                confirmados: data2.data,
                asignados: data3.data,
                cartas: data4.data,
                porcentajePorConfirmar: Math.trunc((data1.data*100)/data.data),
                porcentajeConfirmados:Math.trunc((data2.data*100)/data.data),
                porcentajeCartas: Math.trunc((data4.data*100)/data.data),
                porcentajeAsignados: Math.trunc((data3.data*100)/data.data)
            }
            yield put(getConteoEmbargosSuccess(datos))
        }
        if(data.status==403&&data1.status==403&&data2.status==403&&data3.status==403&&data4.status==403){
            yield put(auth.actions.logout())
        }


}
function* rankingUsersSaga(payload){
    const config = {
        headers: {
            Authorization: 'Bearer ' + payload.token,
            'Content-Type': 'application/json'
        },
       
    };
    var fecha=new Date();
    
    var HaceUnaSemanaNoFormat=(new Date(fecha.getTime() - (24*60*60*1000)*7))
    var HaceUnaSemana=(new Date(fecha.getTime() - (24*60*60*1000)*7)).toISOString().split('T')[0];
    var HaceUnaSemanaFormat=HaceUnaSemana.split('-')
    var ultimoDia= (new Date(fecha.getTime()).toISOString().split('T')[0]).split('-')
   
    console.log(HaceUnaSemanaFormat)
    console.log(ultimoDia);
   
    const data= yield axios.get('https://bancow.finseiz.com/api/v1/stats/users?filter=CONFIRMED&page=0&range='+HaceUnaSemanaFormat[0]+'.'+HaceUnaSemanaFormat[1]+'.'+HaceUnaSemanaFormat[2]+'-'+ultimoDia[0]+'.'+ultimoDia[1]+'.'+ultimoDia[2]+'&size=10',config)
    .then(response=>response)
    .catch(error=>error.response)
    console.log(data)
}

function* userRootSaga() {
    yield all([
        takeEvery(CONTEO_EMBARGOS, conteoEmbargosSaga),
        takeEvery(STATS_RANKING_USER, rankingUsersSaga),

    ])
}

const userSagas = [
    fork(userRootSaga),
];

export default userSagas