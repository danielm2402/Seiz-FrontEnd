import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "./ducks/auth.duck";
import { metronic } from "../../_metronic";
import uploadReducer from '../redux/modules/reducers/uploadReducer'

//sagas
import uploadSagas from "../redux/modules/sagas/uploadSaga";
export const rootReducer = combineReducers({
  auth: auth.reducer,
  i18n: metronic.i18n.reducer,
  builder: metronic.builder.reducer,
  uploadReducer
});

export function* rootSaga() {
  yield all([...auth.saga(), ...uploadSagas]);
}
