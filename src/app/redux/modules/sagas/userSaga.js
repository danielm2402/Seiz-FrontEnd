
import {
    call, fork, put, take, takeEvery, all
} from 'redux-saga/effects';
import axios from 'axios';
import { GET_USER, CHANGE_PASSWORD, UPDATE_USER } from '../../constants/userConst'
import { getUserSuccess, newMensaje,getUser } from '../../actions/userAction'
function* obtenerUserSaga(payload) {

    console.log('OBTENIENDO usuario saga...');
    const config = {
        headers: {
            Authorization: 'Bearer ' + payload.token,
            'Content-Type': 'application/json'
        },

    };
    const data = yield axios.get('https://bancow.finseiz.com/api/v1/users/' + payload.id
        , config)
        .then(response => response)
        .catch(error => error.response)
    console.log(data)
    yield put(getUserSuccess(data.data))

}
function* changePasswordSaga(payload) {

    console.log('CAMBIANDO CONTRASEÑA');
    const config = {
        headers: {
            Authorization: 'Bearer ' + payload.token,
            'Content-Type': 'application/json'
        },

    };
    const data = yield axios.put('https://bancow.finseiz.com/api/v1/users/' + payload.data.id + '/password', {
        passReq: {
            confirmPassword: payload.data.confirm,
            password: payload.data.password
        }
    }, config)
        .then(response => response)
        .catch(error => error.response)
    console.log(data)
    switch (data.status) {
        case 200:
            yield put(newMensaje('Contraseña actualizada correctamente'))
            break;
        case 403:
            yield put(newMensaje('The user does not have the credentials to access the resource'))
            break;
        default:
            yield put(newMensaje('Error, contacte al administrador'))
            break;
    }


}
function* updateUserSaga(payload) {
    console.log('ACTUALIZANDO USER');
    const config = {
        headers: {
            Authorization: 'Bearer ' + payload.token,
            'Content-Type': 'application/json'
        },

    };
    const data = yield axios.put('https://bancow.finseiz.com/api/v1/users/' + payload.data.id, {
        entity: {
            email: payload.data.email,
            name: payload.data.name,
            enabled: payload.data.enabled,
            surname: payload.data.surname,
            embTypes: payload.data.embTypes,
            roles: payload.data.roles,
            username: payload.data.username
        }
    }, config)
        .then(response => response)
        .catch(error => error.response)
    console.log(data)
    switch (data.status) {
        case 200:
            yield put(newMensaje('Usuario actualizado correctamente'))
            yield put(getUser(payload.data.id))
            break;
        case 403:
            yield put(newMensaje('The user does not have the credentials to access the resource'))
            break;
        default:
            yield put(newMensaje('Error, contacte al administrador'))
            break;
    }


}


function* userRootSaga() {
    yield all([
        takeEvery(GET_USER, obtenerUserSaga),
        takeEvery(CHANGE_PASSWORD, changePasswordSaga),
        takeEvery(UPDATE_USER, updateUserSaga),

    ])
}

const userSagas = [
    fork(userRootSaga),
];

export default userSagas