import { all } from 'redux-saga/effects';
import authSaga from '../modules/sagas/authSaga'
import productSaga from '../modules/sagas/productSaga'
import menuCategoriesSaga from '../modules/sagas/menuCategoriesSaga'
import carritoSaga from '../modules/sagas/carritoSaga'



export default function* sagas(){
    yield all([
        ...authSaga,
        ...productSaga,
        ...menuCategoriesSaga,
        ...carritoSaga
    ])
}