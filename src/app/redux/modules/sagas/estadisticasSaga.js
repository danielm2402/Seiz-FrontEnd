
import {
    call, fork, put, take, takeEvery, all
} from 'redux-saga/effects';
import axios from 'axios';
import { GET_BARRAS_SEMANALES, GET_HISTORIAL_ME, GET_HISTORIAL, CONTEO_EMBARGOS, STATS_RANKING_USER, STATS_ME_MVP, CONTEO_EMBARGOS_SUCCESS, STATS_USER, STATS_USER_SUCCESS, STATS_GENERAL, STATS_GENERAL_SUCCESS } from '../../constants/estadisticasConst'
import { getHistorialSuccessMe, getConteoEmbargosSuccess, getHistorialSuccess, getStatsRankingUserSuccess } from '../../actions/estadisticasAction'
import * as auth from "../../../store/ducks/auth.duck";
var jwtDecode = require('jwt-decode');
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
    if (data.status == 200 && data1.status == 200 && data2.status == 200 && data3.status == 200 && data4.status == 200) {
        const datos = {
            total: data.data,
            PorConfirmar: data1.data,
            confirmados: data2.data,
            asignados: data3.data,
            cartas: data4.data,
            porcentajePorConfirmar: Math.trunc((data1.data * 100) / data.data),
            porcentajeConfirmados: Math.trunc((data2.data * 100) / data.data),
            porcentajeCartas: Math.trunc((data4.data * 100) / data.data),
            porcentajeAsignados: Math.trunc((data3.data * 100) / data.data)
        }
        yield put(getConteoEmbargosSuccess(datos))
    }
    if (data.status == 403 && data1.status == 403 && data2.status == 403 && data3.status == 403 && data4.status == 403) {
        yield put(auth.actions.logout())
    }


}
function* rankingUsersSaga(payload) {
    const config = {
        headers: {
            Authorization: 'Bearer ' + payload.token,
            'Content-Type': 'application/json'
        },

    };
    var fecha = new Date();

    var HaceUnaSemanaNoFormat = (new Date(fecha.getTime() - (24 * 60 * 60 * 1000) * 7))
    var HaceUnaSemana = (new Date(fecha.getTime() - (24 * 60 * 60 * 1000) * 7)).toISOString().split('T')[0];
    var HaceUnaSemanaFormat = HaceUnaSemana.split('-')
    var ultimoDia = (new Date(fecha.getTime()).toISOString().split('T')[0]).split('-')

    console.log(HaceUnaSemanaFormat)
    console.log(ultimoDia);

    const data = yield axios.get('https://bancow.finseiz.com/api/v1/stats/users?filter=CONFIRMED&page=0&range=' + HaceUnaSemanaFormat[0] + '.' + HaceUnaSemanaFormat[1] + '.' + HaceUnaSemanaFormat[2] + '-' + ultimoDia[0] + '.' + ultimoDia[1] + '.' + ultimoDia[2] + '&size=10', config)
        .then(response => response)
        .catch(error => error.response)
    console.log(data)
    switch (data.status) {
        case 200:
            let vector = []
            for (var i = 0; i < data.data.length; i++) {
                var element = yield axios.get('https://bancow.finseiz.com/api/v1/users/' + data.data[i].user, config)
                    .then(response => response.data)
                    .catch(err => err.response)
                vector.push(element)

            }


            yield put(getStatsRankingUserSuccess(vector))


            break;

        default:
            break;
    }
}

function* statsMeMvpSaga(payload) {
    const config = {
        headers: {
            Authorization: 'Bearer ' + payload.token,
            'Content-Type': 'application/json'
        },

    };
    var fecha = new Date();

    var HaceUnaSemanaNoFormat = (new Date(fecha.getTime() - (24 * 60 * 60 * 1000) * 7))
    var HaceUnaSemana = (new Date(fecha.getTime() - (24 * 60 * 60 * 1000) * 7)).toISOString().split('T')[0];
    var HaceUnaSemanaFormat = HaceUnaSemana.split('-')
    var ultimoDia = (new Date(fecha.getTime()).toISOString().split('T')[0]).split('-')

    console.log(HaceUnaSemanaFormat)
    console.log(ultimoDia);

    const data = yield axios.get('https://bancow.finseiz.com/api/v1/stats/users?filter=CONFIRMED&page=0&range=' + HaceUnaSemanaFormat[0] + '.' + HaceUnaSemanaFormat[1] + '.' + HaceUnaSemanaFormat[2] + '-' + ultimoDia[0] + '.' + ultimoDia[1] + '.' + ultimoDia[2] + '&size=10', config)
        .then(response => response)
        .catch(error => error.response)
    console.log(data)
    switch (data.status) {
        case 200:
            let vector = []
            for (var i = 0; i < data.data.length; i++) {
                var element = yield axios.get('https://bancow.finseiz.com/api/v1/users/' + data.data[i].user, config)
                    .then(response => response.data)
                    .catch(err => err.response)
                vector.push(element)

            }


            yield put(getStatsRankingUserSuccess(vector))


            break;

        default:
            break;
    }
}

function* getHistorialSaga(payload) {
    console.log('OBTENIENDO HISTORIAL')
    const config = {
        headers: {
            Authorization: 'Bearer ' + payload.token,
            'Content-Type': 'application/json'
        },
    };
    const data = yield axios.post('https://bancow.finseiz.com/api/v1/embargos/list?estadoEmbargo=CONFIRMADO&sort.sorted=true', {}, config)
        .then(response => response)
        .catch(error => error.response)
    switch (data.status) {
        case 200:
            yield put(getHistorialSuccess(data.data))

            break;

        default:
            break;
    }
    console.log(data)

}
function* getHistorialMeSaga(payload) {
    console.log('OBTENIENDO HISTORIAL')
    const config = {
        headers: {
            Authorization: 'Bearer ' + payload.token,
            'Content-Type': 'application/json'
        },
    };
    const data = yield axios.post('https://bancow.finseiz.com/api/v1/embargos/list?assignedTo=' + payload.user + '&estadoEmbargo=CONFIRMADO&sort.sorted=true', {}, config)
        .then(response => response)
        .catch(error => error.response)
    switch (data.status) {
        case 200:
            yield put(getHistorialSuccessMe(data.data))

            break;

        default:
            break;
    }
    console.log(data)

}

function* getBarrasSemanalesSaga(payload) {
    console.log('OBTENIENDO HISTORIAL')

    const config = {
        headers: {
            Authorization: 'Bearer ' + payload.token,
            'Content-Type': 'application/json'
        },
    };
    console.log('FECHA DE CADA DIA DE LA ANTERIOR SEMANA')
    var fechaActual = new Date();
    var dia = new Date(fechaActual.getTime())
    console.log(dia.getFullYear())
    console.log(dia.getMonth() + 1)
    console.log(dia.getDay() + 1)


    var diasARestar = 6 + dia.getUTCDay()
    var fechaInicio = new Date(`${dia.getMonth() + 1}/${dia.getDay() + 1}/${dia.getFullYear()}`)
    console.log(fechaInicio)
    fechaInicio.setDate(fechaInicio.getDate() - diasARestar);
    var Lunes = new Date(fechaInicio.getTime() - (fechaInicio.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fechaInicio.setDate(fechaInicio.getDate() + 1);
    var Martes = new Date(fechaInicio.getTime() - (fechaInicio.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fechaInicio.setDate(fechaInicio.getDate() + 1);
    var Miercoles = new Date(fechaInicio.getTime() - (fechaInicio.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fechaInicio.setDate(fechaInicio.getDate() + 1);
    var Jueves = new Date(fechaInicio.getTime() - (fechaInicio.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fechaInicio.setDate(fechaInicio.getDate() + 1);
    var Viernes = new Date(fechaInicio.getTime() - (fechaInicio.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fechaInicio.setDate(fechaInicio.getDate() + 1);
    var Sabado = new Date(fechaInicio.getTime() - (fechaInicio.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fechaInicio.setDate(fechaInicio.getDate() + 1);
    var Domingo = new Date(fechaInicio.getTime() - (fechaInicio.getTimezoneOffset() * 60000)).toISOString().split("T")[0]

    Lunes = Lunes.split('-')
    Martes = Martes.split('-')
    Miercoles = Miercoles.split('-')
    Jueves = Jueves.split('-')
    Viernes = Viernes.split('-')
    Sabado = Sabado.split('-')
    Domingo = Domingo.split('-')
    console.log(Lunes)
    console.log(Martes)
    console.log(Miercoles)
    console.log(Jueves)
    console.log(Viernes)
    console.log(Sabado)
    console.log(Domingo)


    const rLunes =
        yield axios.get(`https://bancow.finseiz.com/api/v1/stats/?dateRange=${Lunes[0]}.${Lunes[1]}.${Lunes[2]}-${Lunes[0]}.${Lunes[1]}.${Lunes[2]}&filter=CONFIRMED&periodU=D`, config)
            .then(response => response)
            .catch(err => err.response)
    const rMartes =
        yield axios.get(`https://bancow.finseiz.com/api/v1/stats/?dateRange=${Martes[0]}.${Martes[1]}.${Martes[2]}-${Martes[0]}.${Martes[1]}.${Martes[2]}&filter=CONFIRMED&periodU=D`, config)
            .then(response => response)
            .catch(err => err.response)
    const rMiercoles =
        yield axios.get(`https://bancow.finseiz.com/api/v1/stats/?dateRange=${Miercoles[0]}.${Miercoles[1]}.${Miercoles[2]}-${Miercoles[0]}.${Miercoles[1]}.${Miercoles[2]}&filter=CONFIRMED&periodU=D`, config)
            .then(response => response)
            .catch(err => err.response)
    const rJueves =
        yield axios.get(`https://bancow.finseiz.com/api/v1/stats/?dateRange=${Jueves[0]}.${Jueves[1]}.${Jueves[2]}-${Jueves[0]}.${Jueves[1]}.${Jueves[2]}&filter=CONFIRMED&periodU=D`, config)
            .then(response => response)
            .catch(err => err.response)
    const rViernes =
        yield axios.get(`https://bancow.finseiz.com/api/v1/stats/?dateRange=${Viernes[0]}.${Viernes[1]}.${Viernes[2]}-${Viernes[0]}.${Viernes[1]}.${Viernes[2]}&filter=CONFIRMED&periodU=D`, config)
            .then(response => response)
            .catch(err => err.response)
    const rSabado =
        yield axios.get(`https://bancow.finseiz.com/api/v1/stats/?dateRange=${Sabado[0]}.${Sabado[1]}.${Sabado[2]}-${Sabado[0]}.${Sabado[1]}.${Sabado[2]}&filter=CONFIRMED&periodU=D`, config)
            .then(response => response)
            .catch(err => err.response)

    const vectorResponse = [rLunes.data, rMartes.data, rMiercoles.data, rJueves.data, rViernes.data, rSabado.data]

    
    console.log('DECODE JSON')
    const id = jwtDecode(payload.token).userId
    console.log(id)

    //STATS USER

    const uLunes =
        yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${id}/?dateRange=${Lunes[0]}.${Lunes[1]}.${Lunes[2]}-${Lunes[0]}.${Lunes[1]}.${Lunes[2]}&filter=CONFIRMED&periodU=D`, config)
            .then(response => response)
            .catch(err => err.response)
    const uMartes =
        yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${id}/?dateRange=${Martes[0]}.${Martes[1]}.${Martes[2]}-${Martes[0]}.${Martes[1]}.${Martes[2]}&filter=CONFIRMED&periodU=D`, config)
            .then(response => response)
            .catch(err => err.response)
    const uMiercoles =
        yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${id}/?dateRange=${Miercoles[0]}.${Miercoles[1]}.${Miercoles[2]}-${Miercoles[0]}.${Miercoles[1]}.${Miercoles[2]}&filter=CONFIRMED&periodU=D`, config)
            .then(response => response)
            .catch(err => err.response)
    const uJueves =
        yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${id}/?dateRange=${Jueves[0]}.${Jueves[1]}.${Jueves[2]}-${Jueves[0]}.${Jueves[1]}.${Jueves[2]}&filter=CONFIRMED&periodU=D`, config)
            .then(response => response)
            .catch(err => err.response)
    const uViernes =
        yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${id}/?dateRange=${Viernes[0]}.${Viernes[1]}.${Viernes[2]}-${Viernes[0]}.${Viernes[1]}.${Viernes[2]}&filter=CONFIRMED&periodU=D`, config)
            .then(response => response)
            .catch(err => err.response)
    const uSabado =
        yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${id}/?dateRange=${Sabado[0]}.${Sabado[1]}.${Sabado[2]}-${Domingo[0]}.${Sabado[1]}.${Sabado[2]}&filter=CONFIRMED&periodU=D`, config)
            .then(response => response)
            .catch(err => err.response)
    const vectorUser=[uLunes.data, uMartes.data, uMiercoles.data, uJueves.data, uViernes.data, uSabado.data]     
    console.log('LA RESPUESTA ES')
    console.log(vectorResponse)
   
    console.log(vectorUser)
}

function* userRootSaga() {
    yield all([
        takeEvery(CONTEO_EMBARGOS, conteoEmbargosSaga),
        takeEvery(STATS_RANKING_USER, rankingUsersSaga),
        takeEvery(STATS_ME_MVP, statsMeMvpSaga),
        takeEvery(GET_HISTORIAL, getHistorialSaga),
        takeEvery(GET_HISTORIAL_ME, getHistorialMeSaga),
        takeEvery(GET_BARRAS_SEMANALES, getBarrasSemanalesSaga),




    ])
}

const userSagas = [
    fork(userRootSaga),
];

export default userSagas