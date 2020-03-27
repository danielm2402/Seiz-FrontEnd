
import {
    call, fork, put, take, takeEvery, all
} from 'redux-saga/effects';
import axios from 'axios';
import { GET_BARRAS_SEMANALES, GET_POLYGON, GET_HISTORIAL_ME, GET_HISTORIAL, CONTEO_EMBARGOS, STATS_RANKING_USER, STATS_ME_MVP, CONTEO_EMBARGOS_SUCCESS, STATS_USER, STATS_USER_SUCCESS, STATS_GENERAL, STATS_GENERAL_SUCCESS, GET_ESTADISTICAS_USER_GENERAL } from '../../constants/estadisticasConst'
import { getPolygonSuccess, statsMeMvpSuccess, getHistorialSuccessMe, getConteoEmbargosSuccess, getHistorialSuccess, getStatsRankingUserSuccess, getBarrasSemanalesSuccess, getStadisticsUserGeneralSuccess } from '../../actions/estadisticasAction'
import * as auth from "../../../store/ducks/auth.duck";
import { FormattedDate } from 'react-intl';
var jwtDecode = require('jwt-decode');
function* conteoEmbargosSaga(payload) {

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
    if (payload.fecha === '') {
        var fechaActual = new Date();
        var dia = new Date(fechaActual.getTime() - (fechaActual.getTimezoneOffset() * 60000)).toISOString()
            .split("T")[0];

        var fecha1 = new Date(dia);

        var diapararestar = fecha1.getUTCDay();
        let dias1
        if (diapararestar == 0) {
            dias1 = (-6);
            fecha1.setDate((fecha1.getDate() + dias1) + 1)

        } else {
            dias1 = (diapararestar - 1) * (-1);
            fecha1.setDate(fecha1.getDate() + dias1);
            fecha1.setDate(fecha1.getDate() - 6)
        }


        var Lunes = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
        fecha1.setDate(fecha1.getDate() + 1);
        var Martes = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
        fecha1.setDate(fecha1.getDate() + 1);
        var Miercoles = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
        fecha1.setDate(fecha1.getDate() + 1);
        var Jueves = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
        fecha1.setDate(fecha1.getDate() + 1);
        var Viernes = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
        fecha1.setDate(fecha1.getDate() + 1);
        var Sabado = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
        fecha1.setDate(fecha1.getDate() + 1);
        var Domingo = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
        Lunes = Lunes.split('-')
        Martes = Martes.split('-')
        Miercoles = Miercoles.split('-')
        Jueves = Jueves.split('-')
        Viernes = Viernes.split('-')
        Sabado = Sabado.split('-')
        Domingo = Domingo.split('-')


        const data = yield axios.get('https://bancow.finseiz.com/api/v1/stats/users?filter=CONFIRMED&page=0&range=' + Lunes[0] + '.' + Lunes[1] + '.' + Lunes[2] + '-' + Sabado[0] + '.' + Sabado[1] + '.' + Sabado[2] + '&size=5', config)
            .then(response => response)
            .catch(error => error.response)

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

    }else{
        console.log('LAS FECHAS SON')
        console.log(payload.fecha)
         const data1= yield axios.get('https://bancow.finseiz.com/api/v1/stats/users?filter=CONFIRMED&page=0&range=' +payload.fecha.init.replace(/[-]/g, '.')+'-'+payload.fecha.final.replace(/[-]/g, '.') + '&size=4', config)
        .then(response => response)
        .catch(error => error.response)  
        console.log(data1)

        switch (data1.status) {
            case 200:
                let vector = []
                for (var i = 0; i < data1.data.length; i++) {
                    var element = yield axios.get('https://bancow.finseiz.com/api/v1/users/' + data1.data[i].user, config)
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

}

function* statsMeMvpSaga(payload) {
    const config = {
        headers: {
            Authorization: 'Bearer ' + payload.token,
            'Content-Type': 'application/json'
        },

    };


    var fechaActual = new Date();
    var dia = new Date(fechaActual.getTime() - (fechaActual.getTimezoneOffset() * 60000)).toISOString()
        .split("T")[0];

    var fecha1 = new Date(dia);

    var diapararestar = fecha1.getUTCDay();
    let dias1
    if (diapararestar == 0) {
        dias1 = (-6);
        fecha1.setDate((fecha1.getDate() + dias1) + 1)

    } else {
        dias1 = (diapararestar - 1) * (-1);
        fecha1.setDate(fecha1.getDate() + dias1);
        fecha1.setDate(fecha1.getDate() - 6)
    }

    var Lunes = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fecha1.setDate(fecha1.getDate() + 1);
    var Martes = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fecha1.setDate(fecha1.getDate() + 1);
    var Miercoles = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fecha1.setDate(fecha1.getDate() + 1);
    var Jueves = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fecha1.setDate(fecha1.getDate() + 1);
    var Viernes = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fecha1.setDate(fecha1.getDate() + 1);
    var Sabado = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fecha1.setDate(fecha1.getDate() + 1);
    var Domingo = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    Lunes = Lunes.split('-')
    Martes = Martes.split('-')
    Miercoles = Miercoles.split('-')
    Jueves = Jueves.split('-')
    Viernes = Viernes.split('-')
    Sabado = Sabado.split('-')
    Domingo = Domingo.split('-')

    try {



        const Mvp = yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users?filter=CONFIRMED&page=0&range=${Lunes[0]}.${Lunes[1]}.${Lunes[2]}-${Sabado[0]}.${Sabado[1]}.${Sabado[2]}&size=1`, config)
            .then(response => response)
            .catch(err => err.response)

        const mvpStats = yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${Mvp.data[0].user}?dateRange=${Lunes[0]}.${Lunes[1]}.${Lunes[2]}-${Sabado[0]}.${Sabado[1]}.${Sabado[2]}&filter=CONFIRMED&periodU=D`, config)
        yield put(statsMeMvpSuccess(mvpStats.data))
    } catch (error) {

    }
}

function* getHistorialSaga(payload) {

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


}
function* getHistorialMeSaga(payload) {

    const config = {
        headers: {
            Authorization: 'Bearer ' + payload.token,
            'Content-Type': 'application/json'
        },
    };
    const data = yield axios.post('https://bancow.finseiz.com/api/v1/embargos/list?assignedTo=' + payload.user + '&estadoEmbargo=CONFIRMADO&sort.sorted=true', {}, config)
        .then(response => response)
        .catch(error => error.response)
        console.log('MIS EMBARGOS')
        console.log(data)
    switch (data.status) {
        case 200:
            yield put(getHistorialSuccessMe(data.data))

            break;

        default:
            break;
    }


}

function* getBarrasSemanalesSaga(payload) {


    const config = {
        headers: {
            Authorization: 'Bearer ' + payload.token,
            'Content-Type': 'application/json'
        },
    };

    var fechaActual = new Date();
    var dia = new Date(fechaActual.getTime() - (fechaActual.getTimezoneOffset() * 60000)).toISOString()
        .split("T")[0];

    var fecha1 = new Date(dia);

    var diapararestar = fecha1.getUTCDay();
    let dias1
    if (diapararestar == 0) {
        dias1 = (-6);
        fecha1.setDate((fecha1.getDate() + dias1) + 1)

    } else {
        dias1 = (diapararestar - 1) * (-1);
        fecha1.setDate(fecha1.getDate() + dias1);
        fecha1.setDate(fecha1.getDate() - 6)
    }
    console.log('LA FECHA DE INICIO ES')
    console.log(fecha1)

    var Lunes = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fecha1.setDate(fecha1.getDate() + 1);
    var Martes = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fecha1.setDate(fecha1.getDate() + 1);
    var Miercoles = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fecha1.setDate(fecha1.getDate() + 1);
    var Jueves = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fecha1.setDate(fecha1.getDate() + 1);
    var Viernes = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fecha1.setDate(fecha1.getDate() + 1);
    var Sabado = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fecha1.setDate(fecha1.getDate() + 1);
    var Domingo = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    Lunes = Lunes.split('-')
    Martes = Martes.split('-')
    Miercoles = Miercoles.split('-')
    Jueves = Jueves.split('-')
    Viernes = Viernes.split('-')
    Sabado = Sabado.split('-')
    Domingo = Domingo.split('-')


    try {



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


        const id = jwtDecode(payload.token).userId


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
        const vectorUser = [uLunes.data, uMartes.data, uMiercoles.data, uJueves.data, uViernes.data, uSabado.data]


        const dataStats = { general: vectorResponse, user: vectorUser }
        yield put(getBarrasSemanalesSuccess(dataStats))
    } catch (error) {

    }
}
function* getEstadisticasUserGeneralSaga(payload) {

    const config = {
        headers: {
            Authorization: 'Bearer ' + payload.token,
            'Content-Type': 'application/json'
        },
    };

    var fechaActual = new Date();
    var dia = new Date(fechaActual.getTime() - (fechaActual.getTimezoneOffset() * 60000)).toISOString()
        .split("T")[0];

    var fecha1 = new Date(dia);

    var diapararestar = fecha1.getUTCDay();
    let dias1
    if (diapararestar == 0) {
        dias1 = (-6);
        fecha1.setDate((fecha1.getDate() + dias1) + 1)

    } else {
        dias1 = (diapararestar - 1) * (-1);
        fecha1.setDate(fecha1.getDate() + dias1);
        fecha1.setDate(fecha1.getDate() - 6)
    }


    var Lunes = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fecha1.setDate(fecha1.getDate() + 1);
    var Martes = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fecha1.setDate(fecha1.getDate() + 1);
    var Miercoles = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fecha1.setDate(fecha1.getDate() + 1);
    var Jueves = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fecha1.setDate(fecha1.getDate() + 1);
    var Viernes = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fecha1.setDate(fecha1.getDate() + 1);
    var Sabado = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    fecha1.setDate(fecha1.getDate() + 1);
    var Domingo = new Date(fecha1.getTime() - (fecha1.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    Lunes = Lunes.split('-')
    Martes = Martes.split('-')
    Miercoles = Miercoles.split('-')
    Jueves = Jueves.split('-')
    Viernes = Viernes.split('-')
    Sabado = Sabado.split('-')
    Domingo = Domingo.split('-')



    const id = jwtDecode(payload.token).userId


    //STATS USER
    try {



        const uLunes =
            yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${id}/?dateRange=${Lunes[0]}.${Lunes[1]}.${Lunes[2]}-${Lunes[0]}.${Lunes[1]}.${Lunes[2]}&filter=UPLOADED&periodU=D`, config)
                .then(response => response)
                .catch(err => err.response)
        const uMartes =
            yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${id}/?dateRange=${Martes[0]}.${Martes[1]}.${Martes[2]}-${Martes[0]}.${Martes[1]}.${Martes[2]}&filter=UPLOADED&periodU=D`, config)
                .then(response => response)
                .catch(err => err.response)
        const uMiercoles =
            yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${id}/?dateRange=${Miercoles[0]}.${Miercoles[1]}.${Miercoles[2]}-${Miercoles[0]}.${Miercoles[1]}.${Miercoles[2]}&filter=UPLOADED&periodU=D`, config)
                .then(response => response)
                .catch(err => err.response)
        const uJueves =
            yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${id}/?dateRange=${Jueves[0]}.${Jueves[1]}.${Jueves[2]}-${Jueves[0]}.${Jueves[1]}.${Jueves[2]}&filter=UPLOADED&periodU=D`, config)
                .then(response => response)
                .catch(err => err.response)
        const uViernes =
            yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${id}/?dateRange=${Viernes[0]}.${Viernes[1]}.${Viernes[2]}-${Viernes[0]}.${Viernes[1]}.${Viernes[2]}&filter=UPLOADED&periodU=D`, config)
                .then(response => response)
                .catch(err => err.response)
        const uSabado =
            yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${id}/?dateRange=${Sabado[0]}.${Sabado[1]}.${Sabado[2]}-${Domingo[0]}.${Sabado[1]}.${Sabado[2]}&filter=UPLOADED&periodU=D`, config)
                .then(response => response)
                .catch(err => err.response)
        const vectorUser = [uLunes.data, uMartes.data, uMiercoles.data, uJueves.data, uViernes.data, uSabado.data]


        const aLunes =
            yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${id}/?dateRange=${Lunes[0]}.${Lunes[1]}.${Lunes[2]}-${Lunes[0]}.${Lunes[1]}.${Lunes[2]}&filter=ASSIGNED&periodU=D`, config)
                .then(response => response)
                .catch(err => err.response)
        const aMartes =
            yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${id}/?dateRange=${Martes[0]}.${Martes[1]}.${Martes[2]}-${Martes[0]}.${Martes[1]}.${Martes[2]}&filter=ASSIGNED&periodU=D`, config)
                .then(response => response)
                .catch(err => err.response)
        const aMiercoles =
            yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${id}/?dateRange=${Miercoles[0]}.${Miercoles[1]}.${Miercoles[2]}-${Miercoles[0]}.${Miercoles[1]}.${Miercoles[2]}&filter=ASSIGNED&periodU=D`, config)
                .then(response => response)
                .catch(err => err.response)
        const aJueves =
            yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${id}/?dateRange=${Jueves[0]}.${Jueves[1]}.${Jueves[2]}-${Jueves[0]}.${Jueves[1]}.${Jueves[2]}&filter=ASSIGNED&periodU=D`, config)
                .then(response => response)
                .catch(err => err.response)
        const aViernes =
            yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${id}/?dateRange=${Viernes[0]}.${Viernes[1]}.${Viernes[2]}-${Viernes[0]}.${Viernes[1]}.${Viernes[2]}&filter=ASSIGNED&periodU=D`, config)
                .then(response => response)
                .catch(err => err.response)
        const aSabado =
            yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${id}/?dateRange=${Sabado[0]}.${Sabado[1]}.${Sabado[2]}-${Domingo[0]}.${Sabado[1]}.${Sabado[2]}&filter=ASSIGNED&periodU=D`, config)
                .then(response => response)
                .catch(err => err.response)
        const vectorUserAssig = [aLunes.data, aMartes.data, aMiercoles.data, aJueves.data, aViernes.data, aSabado.data]

        const dataStats = { upload: vectorUser, userAssig: vectorUserAssig }
        yield put(getStadisticsUserGeneralSuccess(dataStats))
    } catch (error) {

    }

}
function* polygonStadisticSaga(payload) {
    const config = {
        headers: {
            Authorization: 'Bearer ' + payload.token,
            'Content-Type': 'application/json'
        },
    };
    var fechaActual = new Date();
    var dia = new Date(fechaActual.getTime())
    const id = jwtDecode(payload.token).userId
    try {



        const data1 = yield axios.get('https://bancow.finseiz.com/api/v1/embargos/count?assignedTo=' + payload.user, config)
            .then(response => response)
            .catch(err => err.response)
        const data = yield axios.get('https://bancow.finseiz.com/api/v1/embargos/count?estadoEmbargo=SIN_CONFIRMAR"', config)
            .then(response => response)
            .catch(err => err.response)
        const data4 = yield axios.get('https://bancow.finseiz.com/api/v1/embargos/count', config)
            .then(response => response)
            .catch(error => error.response)
        const data2 = yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${id}?dateRange=${dia.getFullYear()}.${String("00" + (dia.getMonth() + 1)).slice(-2)}.${String("00" + (dia.getDay() + 1)).slice(-2)}-${dia.getFullYear()}.${String("00" + (dia.getMonth() + 1)).slice(-2)}.${String("00" + (dia.getDay() + 1)).slice(-2)}&filter=CONFIRMED&periodU=D`, config)
            .then(response => response)
            .catch(error => error.response)
        const Mvp = yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users?filter=CONFIRMED&page=0&range=${dia.getFullYear()}.${String("00" + (dia.getMonth() + 1)).slice(-2)}.${String("00" + (dia.getDay() + 1)).slice(-2)}-${dia.getFullYear()}.${String("00" + (dia.getMonth() + 1)).slice(-2)}.${String("00" + (dia.getDay() + 1)).slice(-2)}&size=1`, config)
            .then(response => response)
            .catch(err => err.response)
        const mvpStats = yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${Mvp.data.length !== 0 ? Mvp.data[0].user : id}?dateRange=${dia.getFullYear()}.${String("00" + (dia.getMonth() + 1)).slice(-2)}.${String("00" + (dia.getDay() + 1)).slice(-2)}-${dia.getFullYear()}.${String("00" + (dia.getMonth() + 1)).slice(-2)}.${String("00" + (dia.getDay() + 1)).slice(-2)}&filter=CONFIRMED&periodU=D`, config)

        const data3 = yield axios.get(`https://bancow.finseiz.com/api/v1/stats/?dateRange=${dia.getFullYear()}.${String("00" + (dia.getMonth() + 1)).slice(-2)}.${String("00" + (dia.getDay() + 1)).slice(-2)}-${dia.getFullYear()}.${String("00" + (dia.getMonth() + 1)).slice(-2)}.${String("00" + (dia.getDay() + 1)).slice(-2)}&filter=CONFIRMED&periodU=D`, config)
            .then(response => response)
            .catch(err => err.response)
        const data5 = yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${Mvp.data.length !== 0 ? Mvp.data[0].user : id}?dateRange=${dia.getFullYear()}.${String("00" + (dia.getMonth() + 1)).slice(-2)}.${String("00" + (dia.getDay() + 1)).slice(-2)}-${dia.getFullYear()}.${String("00" + (dia.getMonth() + 1)).slice(-2)}.${String("00" + (dia.getDay() + 1)).slice(-2)}&filter=UPLOADED&periodU=D`, config)
            .then(response => response)
            .catch(err => err.response)
        const data6 = yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${id}?dateRange=${dia.getFullYear()}.${String("00" + (dia.getMonth() + 1)).slice(-2)}.${String("00" + (dia.getDay() + 1)).slice(-2)}-${dia.getFullYear()}.${String("00" + (dia.getMonth() + 1)).slice(-2)}.${String("00" + (dia.getDay() + 1)).slice(-2)}&filter=UPLOADED&periodU=D`, config)
            .then(response => response)
            .catch(err => err.response)
        const data7 = yield axios.get(`https://bancow.finseiz.com/api/v1/stats/?dateRange=${dia.getFullYear()}.${String("00" + (dia.getMonth() + 1)).slice(-2)}.${String("00" + (dia.getDay() + 1)).slice(-2)}-${dia.getFullYear()}.${String("00" + (dia.getMonth() + 1)).slice(-2)}.${String("00" + (dia.getDay() + 1)).slice(-2)}&filter=UPLOADED&periodU=D`, config)
            .then(response => response)
            .catch(err => err.response)
        const data8 = yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${Mvp.data.length !== 0 ? Mvp.data[0].user : id}?dateRange=${dia.getFullYear()}.${String("00" + (dia.getMonth() + 1)).slice(-2)}.${String("00" + (dia.getDay() + 1)).slice(-2)}-${dia.getFullYear()}.${String("00" + (dia.getMonth() + 1)).slice(-2)}.${String("00" + (dia.getDay() + 1)).slice(-2)}&filter=ASSIGNED&periodU=D`, config)
            .then(response => response)
            .catch(err => err.response)
        const data9 = yield axios.get(`https://bancow.finseiz.com/api/v1/stats/users/${id}?dateRange=${dia.getFullYear()}.${String("00" + (dia.getMonth() + 1)).slice(-2)}.${String("00" + (dia.getDay() + 1)).slice(-2)}-${dia.getFullYear()}.${String("00" + (dia.getMonth() + 1)).slice(-2)}.${String("00" + (dia.getDay() + 1)).slice(-2)}&filter=ASSIGNED&periodU=D`, config)
            .then(response => response)
            .catch(err => err.response)


        const datasend = {
            AsignadosVsConfirmados: { other: data9.data.length == 0 ? 0 : data9.data.stat, me: data2.data.length == 0 ? 0 : data2.data.stat, tope: 150 },
            MvpConfirmadosVsMe: { other: mvpStats.data.length == 0 ? 0 : mvpStats.data.stat, me: data2.data.length == 0 ? 0 : data2.data.stat, tope: 150 },
            PromConfirmadoVsMe: { other: data3.data.length == 0 ? 0 : data3.data.stat, me: data2.data.length == 0 ? 0 : data2.data.stat, tope: 150 },
            MvpSubidosVsMe: { other: data5.data.length == 0 ? 0 : data5.data.stat, me: data6.data.length == 0 ? 0 : data6.data.stat, tope: 150 },
            PromedioSubidosVsMe: { other: data7.data.length == 0 ? 0 : data7.data.stat, me: data6.data.length ? 0 : data6.data.stat, tope: 150 },
            MvpAsignadosVsMe: { other: data8.data.length == 0 ? 0 : data8.data.stat, me: data9.data.length == 0 ? 0 : data9.data.stat, tope: 150 },
        }
        yield put(getPolygonSuccess(datasend))
    } catch (error) {

    }
}


function* userRootSaga() {
    yield all([
        takeEvery(CONTEO_EMBARGOS, conteoEmbargosSaga),
        takeEvery(STATS_RANKING_USER, rankingUsersSaga),
        takeEvery(STATS_ME_MVP, statsMeMvpSaga),
        takeEvery(GET_HISTORIAL, getHistorialSaga),
        takeEvery(GET_HISTORIAL_ME, getHistorialMeSaga),
        takeEvery(GET_BARRAS_SEMANALES, getBarrasSemanalesSaga),
        takeEvery(GET_ESTADISTICAS_USER_GENERAL, getEstadisticasUserGeneralSaga),
        takeEvery(GET_POLYGON, polygonStadisticSaga),

    ])
}

const userSagas = [
    fork(userRootSaga),
];

export default userSagas