import {
  call, fork, put, take, takeEvery, all
} from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_EMBARGO, GET_DEMANDADOS,
  GET_EMBARGOS_ASIGNADOS, GET_EMBARGOS_CONFIRMADOS, GET_EMBARGOS_POR_CONFIRMAR, GET_EMBARGOS_ALL, DELETE_EMBARGO
} from '../../constants/EmbargosConst';
import {
  getEmbargosAll, getEmbargosAsignados, getEmbargosPorConfirmar, getEmbargosConfirmados, getDemandadosSuccess, getEmbargoSuccess,
  getEmbargosConfirmadosSuccess, getEmbargosPorConfirmarSuccess, getEmbargosAsignadosSuccess, getEmbargosAllSuccess
} from '../../actions/embargosAction'
import { saveAs } from 'file-saver';
function* getEmbargosConfirmadosSaga(payload) {
  console.log('obteniendo embargos confirmados');
  const config = {
    headers: {
      Authorization: 'Bearer ' + payload.token,
      Accept: 'application/json',
    },
    params: {
      'estadoEmbargo': 'CONFIRMADO'
    }
  };
  const data = yield axios.get('https://bancow.finseiz.com/api/v1/embargos/list', config)
    .then(response => response)
    .catch(err => err.response)
  switch (data.status) {
    case 200:
      yield put(getEmbargosConfirmadosSuccess(data.data))
      break;

    default:
      break;
  }
  console.log(data);

}
function* getEmbargosSinConfirmarSaga(payload) {
  console.log('obteniendo embargos sin confirmar');
  const config = {
    headers: {
      Authorization: 'Bearer ' + payload.token,
      Accept: 'application/json',
    },
    params: {
      'estadoEmbargo': 'SIN_CONFIRMAR'
    }
  };
  const data = yield axios.get('https://bancow.finseiz.com/api/v1/embargos/list', config)
    .then(response => response)
    .catch(err => err.response)
  switch (data.status) {
    case 200:
      yield put(getEmbargosPorConfirmarSuccess(data.data))
      break;

    default:
      break;
  }
  console.log(data);

}
function* getEmbargosAsignadosSaga(payload) {
  console.log('obteniendo embargos asignados');
  const config = {
    headers: {
      Authorization: 'Bearer ' + payload.token,
      Accept: 'application/json',
    },
    qu: {
      'assignedTo': payload.user
    }
  };
  const data = yield axios.get('https://bancow.finseiz.com/api/v1/embargos/list', config)
    .then(response => response)
    .catch(err => err.response)
  switch (data.status) {
    case 200:
      yield put(getEmbargosAsignadosSuccess(data.data))
      break;

    default:
      break;
  }
  console.log(data);

}
function* getEmbargosAllSaga(payload) {
  console.log('obteniendo embargos all');
  const config = {
    headers: {
      Authorization: 'Bearer ' + payload.token,
      Accept: 'application/json',
    },
  };
  const data = yield axios.get('https://bancow.finseiz.com/api/v1/embargos/list', config)
    .then(response => response)
    .catch(err => err.response)
  switch (data.status) {
    case 200:
      yield put(getEmbargosAllSuccess(data.data))
      break;

    default:
      break;
  }
  console.log(data);
}
function* deleteEmbargoSaga(payload) {
  console.log('Eliminando embargo');
  const config = {
    headers: {
      Authorization: 'Bearer ' + payload.token,
      Accept: 'application/json',
    },
  };
  const data = yield axios.delete('https://bancow.finseiz.com/api/v1/embargos/' + payload.id, config)
    .then(response => response)
    .catch(err => err.response)
  switch (data.status) {
    case 200:
      if (payload.path == "/listar/confirmados") {
        yield put(getEmbargosConfirmados(payload.token))
      }
      if (payload.path == "/listar/no-confirmados") {
        yield put(getEmbargosPorConfirmar(payload.token))
      }
      if (payload.path == "/listar/asignados") {
        yield put(getEmbargosAsignados(payload.token))
      }
      if (payload.path == "/listar/todos") {
        yield put(getEmbargosAll(payload.token))
      }
      break;

    default:
      break;
  }
  console.log(data);
}
function* getEmbargoSaga(payload) {
  console.log('obteniendo embargo');
  const config = {
    headers: {
      Authorization: 'Bearer ' + payload.token,
      Accept: 'application/json',
    },
  };
  const config1 = {
    headers: {
      Authorization: 'Bearer ' + payload.token,
      'Content-Type': "application/octet-stream"
    },
    responseType: 'blob'

  }
  const data = yield axios.get('https://bancow.finseiz.com/api/v1/embargos/' + payload.id, config)
    .then(response => response)
    .catch(err => err.response)
    var url=''
  switch (data.status) {
    case 200:
      console.log('obteniendo pdf')
      yield (axios({
        url: data.data.urlEmbargoFile,
        method: 'GET',
        responseType: 'blob', // important
        headers: { Authorization: 'Bearer ' + payload.token, }
      }).then((response) => {
         url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'},'view.pdf'));
      }) );

      const bounding= (yield (axios({
        url: ((data.data.urlEmbargoFile.split('.pdf')[0])+'.json'),
        method: 'GET',
        responseType: 'blob', // important
        headers: { Authorization: 'Bearer ' + payload.token }
      }).then((response) => response.data)))
      console.log(bounding)
      const file = window.URL.createObjectURL(new Blob([bounding], {type: 'application/json'},'view.json'));
      const json= yield axios.get(file)
      .then(response=>response.data)

      const boundingSelector= (yield (axios({
        url: ((data.data.urlEmbargoFile.split('.pdf')[0])+'.jsonl'),
        method: 'GET',
        responseType: 'blob', // important
        headers: { Authorization: 'Bearer ' + payload.token }
      }).then((response) => response.data)))
      console.log(bounding)
      const file1 = window.URL.createObjectURL(new Blob([boundingSelector], {type: 'application/json'},'view1.json'));
      const json1= yield axios.get(file1)
      .then(response=>response.data)

      yield put(getEmbargoSuccess(data.data, url, json, json1))
      break;

    default:
      break;
  }

}
function* getDemandadosSaga(payload) {
  console.log('GET demandado');
  const config = {
    headers: {
      Authorization: 'Bearer ' + payload.token,
      Accept: 'application/json',
    },
    params: {
      'idEmbargo': payload.id
    }
  };
  const data = yield axios.get('https://bancow.finseiz.com/api/v1/demandados/list', config)
    .then(response => response)
    .catch(err => err.response)
  switch (data.status) {
    case 200:
      yield put(getDemandadosSuccess(data.data))
      break;

    default:
      break;
  }

}

function* embargosRootSaga() {
  yield all([
    takeEvery(GET_EMBARGOS_CONFIRMADOS, getEmbargosConfirmadosSaga),
    takeEvery(GET_EMBARGOS_POR_CONFIRMAR, getEmbargosSinConfirmarSaga),
    takeEvery(GET_EMBARGOS_ASIGNADOS, getEmbargosAsignadosSaga),
    takeEvery(GET_EMBARGOS_ALL, getEmbargosAllSaga),
    takeEvery(DELETE_EMBARGO, deleteEmbargoSaga),
    takeEvery(GET_EMBARGO, getEmbargoSaga),
    takeEvery(GET_DEMANDADOS, getDemandadosSaga),




  ])
}

const embargosSagas = [
  fork(embargosRootSaga),
];

export default embargosSagas