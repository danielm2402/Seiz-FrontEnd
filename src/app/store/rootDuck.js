import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "./ducks/auth.duck";
import { metronic } from "../../_metronic";
import uploadReducer from '../redux/modules/reducers/uploadReducer'
import EmbargosReducer from '../redux/modules/reducers/EmbargosReducer'
import userReducer from '../redux/modules/reducers/userReducer'
//sagas
import uploadSagas from "../redux/modules/sagas/uploadSaga";
import embargosSagas from '../redux/modules/sagas/embargosSaga'
import boundingReducer from '../redux/modules/reducers/boundigReducer'
import boundingSagas from '../redux/modules/sagas/boundingSaga';
import userSaga from '../redux/modules/sagas/userSaga'
export const rootReducer = combineReducers({
  auth: auth.reducer,
  i18n: metronic.i18n.reducer,
  builder: metronic.builder.reducer,
  uploadReducer,
  EmbargosReducer,
  boundingReducer,
  userReducer
});

export function* rootSaga() {
  yield all([...auth.saga(), ...uploadSagas,...embargosSagas,...boundingSagas,...userSaga]);
}
