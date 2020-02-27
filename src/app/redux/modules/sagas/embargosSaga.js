import {
  call, fork, put, take, takeEvery, all
} from 'redux-saga/effects';
import axios from 'axios';
import {UPDATE_DEMANDADO,
  GET_EMBARGO, GET_DEMANDADOS, DELETE_DEMANDADO, SAVE_DEMANDADOS, GET_DEMANDADOS_UPDATE_TABLE, CREATE_DEMANDADO,
  GET_EMBARGOS_ASIGNADOS, GET_EMBARGOS_CONFIRMADOS, GET_EMBARGOS_POR_CONFIRMAR, GET_EMBARGOS_ALL, DELETE_EMBARGO, CONFIRMAR_EMBARGO
} from '../../constants/EmbargosConst';
import {
  getDemandados,
  getEmbargosAll, getEmbargosAsignados, getEmbargosPorConfirmar, getEmbargosConfirmados, getDemandadosSuccess, getEmbargoSuccess,
  getEmbargosConfirmadosSuccess, getEmbargosPorConfirmarSuccess, getEmbargosAsignadosSuccess, getEmbargosAllSuccess, nuevoMensaje, resetMensaje
  , getDemandadosUpdateTable, getDemandadosUpdateTableSuccess
} from '../../actions/embargosAction'
import * as auth from "../../../store/ducks/auth.duck";
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
    case 401:
      yield put(auth.actions.logout())
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
    case 401:
      yield put(auth.actions.logout())
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
    case 401:
      yield put(auth.actions.logout())
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
    case 401:
      yield put(auth.actions.logout())
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
    case 401:
      yield put(auth.actions.logout())
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
  var url = ''
  switch (data.status) {
    case 200:
      console.log('obteniendo pdf')
      yield (axios({
        url: data.data.urlEmbargoFile,
        method: 'GET',
        responseType: 'blob', // important
        headers: { Authorization: 'Bearer ' + payload.token, }
      }).then((response) => {
        url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }, 'view.pdf'));
      }));

      const bounding = (yield (axios({
        url: ((data.data.urlEmbargoFile.split('.pdf')[0]) + '.json'),
        method: 'GET',
        responseType: 'blob', // important
        headers: { Authorization: 'Bearer ' + payload.token }
      }).then((response) => response.data)))
      console.log(bounding)
      const file = window.URL.createObjectURL(new Blob([bounding], { type: 'application/json' }, 'view.json'));
      const json = yield axios.get(file)
        .then(response => response.data)

      const boundingSelector = (yield (axios({
        url: ((data.data.urlEmbargoFile.split('.pdf')[0]) + '.jsonl'),
        method: 'GET',
        responseType: 'blob', // important
        headers: { Authorization: 'Bearer ' + payload.token }
      }).then((response) => response.data)))
      console.log(bounding)
      const file1 = window.URL.createObjectURL(new Blob([boundingSelector], { type: 'application/json' }, 'view1.json'));
      const json1 = yield axios.get(file1)
        .then(response => response.data)

      yield put(getEmbargoSuccess(data.data, url, json, json1))
      break;
    case 401:
      yield put(auth.actions.logout())
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
    case 401:
      yield put(auth.actions.logout())
      break;
    default:
      break;
  }

}

function* confirmarEmbargoSaga(payload) {
  console.log('CONFIRMANDO EMBARGO');
  console.log(payload.data)
  const config = {
    headers: {
      Authorization: 'Bearer ' + payload.token,
      Accept: 'application/json',
      "Content-Type": "application/json"
    },
  };
  const data = yield axios.post('https://bancow.finseiz.com/api/v1/embargos/' + payload.data.id + '/confirm', {
    account: payload.data.account,
    address: payload.data.address,
    amount: payload.data.amount,
    city: payload.data.city,
    docId: payload.data.docId,
    documentDate: payload.data.documentDate,
    documentType: payload.data.documentType,
    embargoType: payload.data.embargoType,
    reference: payload.data.reference,
    sender: payload.data.sender
  }, config)
    .then(response => response)
    .catch(err => err.response)

  const demandados = payload.data.demandados.data.map(demandado => {
    return ({
      amount: demandado.montoAEmbargar,
      expedient: demandado.expediente,
      fullname: demandado.nombres,
      id: String(demandado.id).includes('local') ? null : demandado.id,
      identification: demandado.identificacion,
      page: demandado.page,
      typeIdentification: demandado.tipoIdentificacion
    })
  })

  if (demandados.length > 0) {

    const data1 = yield axios.post('https://bancow.finseiz.com/api/v1/demandados/save', {
      demandados: demandados,
      idEmbargo: payload.data.id
    }, config)
      .then(response => response)
      .catch(err => err.response)
    console.log(data1)
  }


  const demandantes = payload.data.demandantes.map(demandante => {
    return ({
      ...demandante,
      id: String(demandante.id).includes('local') ? null : demandante.id
    })
  })
  if (demandantes.length > 0) {
    const data2 = yield axios.post('https://bancow.finseiz.com/api/v1/demandantes/save', {

      demandantes: demandantes,
      idEmbargo: payload.data.id

    }, config)
      .then(response => response)
      .catch(err => err.response)
    console.log(data2)
  }

  switch (data.status) {
    case 200:
      yield put(nuevoMensaje('Embargo confirmado correctamente'))
      break;
    case 401:
      yield put(auth.actions.logout())
      break;
    default:
      yield put(nuevoMensaje('Embargo no pudo ser confirmado correctamente, contacte a soporte'))

      break;
  }

}
function* eliminarDemandadoSaga(payload) {
  console.log('DELETE DEMANDADOS')
  console.log(payload)
  const config = {
    headers: {
      Authorization: 'Bearer ' + payload.token,
      Accept: 'application/json',
      "Content-Type": "application/json"
    },
  };
  const data = yield axios.delete('https://bancow.finseiz.com/api/v1/demandados/' + payload.id, config)
    .then(response => response)
    .catch(error => error.response)
  console.log(data)
  switch (data.value) {
    case 401:
      yield put(auth.actions.logout())
      break;

    default:
      break;
  }
}
function* saveDemandadosSaga(payload) {
  console.log('SALVANDO DEMANDADOS')
  console.log(payload.data)
  const config = {
    headers: {
      Authorization: 'Bearer ' + payload.token,
      Accept: 'application/json',
      "Content-Type": "application/json"
    },
  };
  const demandados = payload.data.map(demandado => {
    return ({
      amount: demandado.montoAEmbargar,
      expedient: demandado.expediente,
      fullname: demandado.nombres,
      id: String(demandado.id).includes('local') ? null : demandado.id,
      identification: demandado.identificacion,
      page: demandado.page,
      typeIdentification: demandado.tipoIdentificacion
    })
  })

  if (demandados.length > 0) {
    const data1 = yield axios.post('https://bancow.finseiz.com/api/v1/demandados/save', {
      demandados: demandados,
      idEmbargo: payload.id
    }, config)
      .then(response => response)
      .catch(err => err.response)
    console.log(data1)
    switch (data1.status) {
      case 200:
        console.log("200000")
        yield put(getDemandadosUpdateTable(payload.id, payload.token))
        break;

      default:
        break;
    }
  }
}
function* crearDemandadoSaga(payload) {
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
  console.log('MIDDLEWAREEEE')
  console.log(payload.demandados)
  console.log(payload.data)
  var demandados = [payload.data, ...payload.demandados]
  const demandadosReq = demandados.map(demandado => {
    return ({
      amount: demandado.montoAEmbargar,
      expedient: demandado.expediente,
      fullname: demandado.nombres,
      id: String(demandado.id).includes('local') ? null : demandado.id,
      identification: demandado.identificacion,
      page: demandado.page,
      typeIdentification: demandado.tipoIdentificacion
    })
  })

  if (demandadosReq.length > 0) {
    const data1 = yield axios.post('https://bancow.finseiz.com/api/v1/demandados/save', {
      demandados: demandadosReq,
      idEmbargo: payload.id
    }, config)
      .then(response => response)
      .catch(err => err.response)
    console.log(data1)
    switch (data1.status) {
      case 200:
        const data = yield axios.get('https://bancow.finseiz.com/api/v1/demandados/list', config)
          .then(response => response)
          .catch(err => err.response)
          console.log(data)
          switch (data.status) {
            case 200:
              yield put(getDemandadosUpdateTableSuccess(data.data));
              break;
          
            default:
              break;
          }
        
        break;

      default:
        break;
    }


  }
}

function* updateDemandadoSaga(payload) {
  console.log('GET demandado');
  const config = {
    headers: {
      Authorization: 'Bearer ' + payload.token,
      Accept: 'application/json',
    },
    params: {
      'idEmbargo': payload.idDoc
    }
  };
  console.log('MIDDLEWAREEEE')
  console.log(payload.demandados)
  console.log(payload.data)
  
  const demandadosReq = payload.demandados.map(demandado => {
    if(demandado.id==payload.id){
      return ({
        amount: payload.data.montoAEmbargar,
        expedient: demandado.expediente,
        fullname: payload.data.nombres,
        id:payload.id,
        identification: payload.data.identificacion,
        page: demandado.page,
        typeIdentification: payload.data.tipoIdentificacion
      })
    }
    return ({
      amount: demandado.montoAEmbargar,
      expedient: demandado.expediente,
      fullname: demandado.nombres,
      id: String(demandado.id).includes('local') ? null : demandado.id,
      identification: demandado.identificacion,
      page: demandado.page,
      typeIdentification: demandado.tipoIdentificacion
    })
  })
  console.log(demandadosReq)
   if (demandadosReq.length > 0) {
    const data1 = yield axios.post('https://bancow.finseiz.com/api/v1/demandados/save', {
      demandados: demandadosReq,
      idEmbargo: payload.idDoc
    }, config)
      .then(response => response)
      .catch(err => err.response)
    console.log(data1)
    switch (data1.status) {
      case 200:
        const data = yield axios.get('https://bancow.finseiz.com/api/v1/demandados/list', config)
          .then(response => response)
          .catch(err => err.response)
          console.log(data)
          switch (data.status) {
            case 200:
              yield put(getDemandadosUpdateTableSuccess(data.data));
              break;
          
            default:
              break;
          }
        
        break;

      default:
        break;
    }


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
    takeEvery(CONFIRMAR_EMBARGO, confirmarEmbargoSaga),
    takeEvery(DELETE_DEMANDADO, eliminarDemandadoSaga),
    takeEvery(SAVE_DEMANDADOS, saveDemandadosSaga),
    takeEvery(CREATE_DEMANDADO, crearDemandadoSaga),
    takeEvery(UPDATE_DEMANDADO,updateDemandadoSaga)




  ])
}

const embargosSagas = [
  fork(embargosRootSaga),
];

export default embargosSagas