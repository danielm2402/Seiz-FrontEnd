import {
    call, fork, put, take, takeEvery, all
} from 'redux-saga/effects';
import history from '../../utils/history';
import axios from 'axios';
import {
    LOGIN_EMAIL_REQUEST, REGISTER_WITH_EMAIL, LOGOUT
} from '../../constants/authConst';
import {
loginWithEmailSuccess, loginWithEmailFailed, registerWithEmailSuccess, registerWithEmailFailed, loginWithEmail,logoutSuccess
}from '../../actions/authAction'

function* loginSaga(payload) {
    console.log('login desde saga...');
    console.log(payload.email)
    console.log(payload.password)
    const config = {
        headers: {            
            Accept: 'application/json',
        }
    };
    const data = yield axios.post('https://primalmkt.com/api/v1/login',{
        username: payload.email,
        password:payload.password
    },config)
    .then(response =>response)
    .catch(err =>err.response)
    switch (data.status) {
        case 200:
            localStorage.setItem('token', data.data.data.access_token);
            yield put(loginWithEmailSuccess(payload.email, data.data.data.access_token, data.data.data.refresh_token,data.data.data.expires_in))
        break;
    
        default:
                yield put(loginWithEmailFailed('error'))
            break;
    }
    console.log(data);
}
function* registerSaga(payload) {
    console.log('register desde saga...');
    console.log(payload.email)
    console.log(payload.password)
    const config = {
        headers: {            
            Accept: 'application/json',
        }
    };
    const data = yield axios.post('https://primalmkt.com//api/v1/register',{
        email: payload.email,
        password:payload.password,
        password_confirmation:payload.password

    },config)
    .then(response =>response)
    .catch(err =>err.response)
    switch (data.status) { 
        case 200:
            yield put(registerWithEmailSuccess('Registro exitoso'))
            yield put(loginWithEmail(payload.email,payload.password));
        break;
    
        default:
                yield put(registerWithEmailFailed('error'))
            break;
    }
    console.log(data);
}
function* logoutSaga(payload){
    console.log('logout desde saga')
    console.log(payload.token)
    const config = {
        headers: {            
            Accept: 'application/json',
            Authorization: 'Bearer '+ payload.token,
        }
    };
    try {
    const data = yield axios.post('https://primalmkt.com/api/v1/logout',{},config)
    .then(response =>response)
    .catch(err =>console.log(err))
    console.log(data)
    yield put(logoutSuccess());

} catch (error) {
        
}
    

}
function* authRootSaga() {
    yield all([
        takeEvery(LOGIN_EMAIL_REQUEST, loginSaga),
        takeEvery(REGISTER_WITH_EMAIL, registerSaga),
        takeEvery(LOGOUT, logoutSaga)
    ])
}

const authSagas = [
    fork(authRootSaga),
];

export default authSagas