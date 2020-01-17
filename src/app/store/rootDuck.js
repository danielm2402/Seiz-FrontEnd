import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "./ducks/auth.duck";
import { metronic } from "../../_metronic";
import uploadReducer from '../redux/modules/reducers/uploadReducer'
import EmbargosReducer from '../redux/modules/reducers/EmbargosReducer'
//sagas
import uploadSagas from "../redux/modules/sagas/uploadSaga";
import embargosSagas from '../redux/modules/sagas/embargosSaga'
export const rootReducer = combineReducers({
  auth: auth.reducer,
  i18n: metronic.i18n.reducer,
  builder: metronic.builder.reducer,
  uploadReducer,
  EmbargosReducer
});

export function* rootSaga() {
  yield all([...auth.saga(), ...uploadSagas,...embargosSagas]);
}