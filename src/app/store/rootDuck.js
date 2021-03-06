import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "./ducks/auth.duck";
import { metronic } from "../../_metronic";
import uploadReducer from '../redux/modules/reducers/uploadReducer'
import EmbargosReducer from '../redux/modules/reducers/EmbargosReducer'
import userReducer from '../redux/modules/reducers/userReducer'
import estadisticasReducer from '../redux/modules/reducers/estadisticasReducer'
import interfazReducer from '../redux/modules/reducers/interfazReducer'
import excelReducer from '../redux/modules/reducers/excelReducer'
//sagas
import uploadSagas from "../redux/modules/sagas/uploadSaga";
import embargosSagas from '../redux/modules/sagas/embargosSaga'
import boundingReducer from '../redux/modules/reducers/boundigReducer'
import boundingSagas from '../redux/modules/sagas/boundingSaga';
import userSaga from '../redux/modules/sagas/userSaga'
import estadisticasSaga from '../redux/modules/sagas/estadisticasSaga'
import excelSaga from '../redux/modules/sagas/excelSaga'
export const rootReducer = combineReducers({
  auth: auth.reducer,
  i18n: metronic.i18n.reducer,
  builder: metronic.builder.reducer,
  uploadReducer,
  EmbargosReducer,
  boundingReducer,
  userReducer,
  estadisticasReducer,
  interfazReducer,
  excelReducer
});

export function* rootSaga() {
  yield all([...auth.saga(), ...uploadSagas,...embargosSagas,...boundingSagas,...userSaga,...estadisticasSaga,...excelSaga]);
}
