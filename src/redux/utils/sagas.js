import { all } from 'redux-saga/effects';
import authSaga from '../modules/sagas/authSaga'




export default function* sagas(){
    yield all([
        ...authSaga,
        
    ])
}