
import {
    call, fork, put, take, takeEvery, all
} from 'redux-saga/effects';
import axios from 'axios';
import { GET_USER } from '../../constants/userConst'
import {getUserSuccess} from '../../actions/userAction'
function* obtenerUserSaga(payload) {

    console.log('OBTENIENDO usuario saga...');
    const config = {
        headers: {
            Authorization: 'Bearer ' + payload.token,
            'Content-Type': 'application/json'
        },
        params: {
            'idEmbargo': 20021000171
        }
    };
    const data = yield axios.get('https://bancow.finseiz.com/api/v1/users/' + payload.id
        , config)
        .then(response => response)
        .catch(error => error.response)
    console.log(data)
    yield put(getUserSuccess(data.data))

}

function* userRootSaga() {
    yield all([
        takeEvery(GET_USER, obtenerUserSaga),

    ])
}

const userSagas = [
    fork(userRootSaga),
];

export default userSagas