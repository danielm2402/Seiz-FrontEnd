import {
  call, fork, put, take, takeEvery, all
} from 'redux-saga/effects';
import axios from 'axios';
import {UPDATE_ALL_REQUEST,GET_DEMANDADOS_FIRST_PAGE,GET_DEMANDADOS_ULTIM_PAGE,
  UPDATE_DEMANDADO, CREATE_DEMANDANTE, DELETE_DEMANDANTE,GET_DEMANDADOS_ANTERIOR, UPDATE_DEMANDANTE, UPDATE_EMBARGO, GET_DEMANDADOS_SIGUIENTE,
  GET_EMBARGO, GET_DEMANDADOS, DELETE_DEMANDADO, SAVE_DEMANDADOS, GET_DEMANDADOS_UPDATE_TABLE, CREATE_DEMANDADO,
  GET_EMBARGOS_ASIGNADOS, GET_EMBARGOS_CONFIRMADOS, GET_EMBARGOS_POR_CONFIRMAR, GET_EMBARGOS_ALL, DELETE_EMBARGO, CONFIRMAR_EMBARGO
} from '../../constants/EmbargosConst';
import {setActualPage,
  getDemandados, getDemandantesUpdateTableSuccess, changeSiguiente,changeAnterior,upadteAllRequestSuccess,
  getEmbargosAll, getEmbargosAsignados, getEmbargosPorConfirmar, getEmbargosConfirmados, getDemandadosSuccess, getEmbargoSuccess,
  getEmbargosConfirmadosSuccess, getEmbargosPorConfirmarSuccess, getEmbargosAsignadosSuccess, getEmbargosAllSuccess, nuevoMensaje, resetMensaje
  , getDemandadosUpdateTable, getDemandadosUpdateTableSuccess, changeUltimPage
} from '../../actions/embargosAction'
import {
  newMensajeBounding, changeDemandadosTablePorConfirmarFalse
} from '../../actions/boundingAction'

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
    case 403:
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
    case 403:
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
    case 403:
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
    case 403:
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
    case 403:
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
      console.log(((data.data.urlEmbargoFile.split('files/')[1])))
      yield (axios({
        url: 'https://bancow.finseiz.com/embargo/embargoimg/?filename=' + (data.data.urlEmbargoFile.split('files/')[1]),
        method: 'GET',
        responseType: 'blob', // important
        headers: { Authorization: 'Bearer ' + payload.token, }
      }).then((response) => {
        url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }, 'view.pdf'));
      }));

      const bounding = (yield (axios({
        url: 'https://bancow.finseiz.com/embargo/embargoimg/?filename=' + ((data.data.urlEmbargoFile.split('files/')[1]).split('.pdf')[0]) + '.json',
        method: 'GET',
        responseType: 'blob', // important
        headers: { Authorization: 'Bearer ' + payload.token }
      }).then((response) => response.data)))
      console.log(bounding)
      const file = window.URL.createObjectURL(new Blob([bounding], { type: 'application/json' }, 'view.json'));
      const json = yield axios.get(file)
        .then(response => response.data)

      const boundingSelector = (yield (axios({
        url: 'https://bancow.finseiz.com/embargo/embargoimg/?filename=' + ((data.data.urlEmbargoFile.split('files/')[1]).split('.pdf')[0]) + '.jsonl',
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
    case 403:
      yield put(auth.actions.logout())
      break;

    default:
      break;
  }

}
function* getDemandadosSaga(payload) {
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
      var separar = data.headers.links.split(",")
      const array = separar.map((item) => {
        return item.split(";")
      })
      let page, ultim
      page=''
      console.log('BANDERAAAAA')
      array.map((item) => {
        item.map((item1) => {
          if (item1.trim() === 'rel="next"') {
            page = item[0]

          }
          if(item1.trim()==='rel="last"'){
            ultim=item[0]
          }
        }
        )
      })
      yield put(getDemandadosSuccess(data.data))
      yield put(setActualPage(0))
      yield put(changeSiguiente(page))
      yield put(changeUltimPage(ultim))

      console.log('OBTENIENDO DEMANDADOS XD');
      console.log(data)
      console.log(page)
      break;
    case 403:
      yield put(auth.actions.logout())
      break;
    default:
      break;
  }

}
function* getDemandadosSagaSiguiente(payload) {
  console.log('OBTENIENDO DEMANDADOS SIGUIENTES XD');
  const config = {
    headers: {
      Authorization: 'Bearer ' + payload.token,
      Accept: 'application/json',
    },
    params: {
      'idEmbargo': payload.id
    }
  };
  const path= payload.path.replace(/[<>]/g, '')
  
   const data = yield axios.get(path, config)
    .then(response => response)
    .catch(err => err.response)
  console.log(data)
  switch (data.status) {
    case 200:
      var separar = data.headers.links.split(",")
      const array = separar.map((item) => {
        return item.split(";")
      })
      var page=''
      var page2=''
      console.log('BANDERAAAAA')
      array.map((item) => {
        item.map((item1) => {
          if (item1.trim() === 'rel="next"') {
            page = item[0]

          }
          if(item1.trim()==='rel="prev"'){
            page2= item[0]
          }
        }
        )
      })
      console.log(page)
      console.log(page2)
      yield put(getDemandadosSuccess(data.data))
      yield put(setActualPage(payload.page+1))
      yield put(changeSiguiente(page))
      yield put(changeAnterior(page2))
      break;
    case 403:
      yield put(auth.actions.logout())
      break;
    default:
      break;
  } 

}
function* getDemandadosSagaAnterior(payload) {
  console.log('OBTENIENDO DEMANDADOS ANTERIOR XD');
  const config = {
    headers: {
      Authorization: 'Bearer ' + payload.token,
      Accept: 'application/json',
    },
    params: {
      'idEmbargo': payload.id
    }
  };
  const path= payload.path.replace(/[<>]/g, '')
  
   const data = yield axios.get(path, config)
    .then(response => response)
    .catch(err => err.response)
  console.log(data)
  switch (data.status) {
    case 200:
      var separar = data.headers.links.split(",")
      const array = separar.map((item) => {
        return item.split(";")
      })
      var page=''
      var page2=''
      array.map((item) => {
        item.map((item1) => {
          if (item1.trim() === 'rel="next"') {
            page = item[0]
          }
          if(item1.trim()==='rel="prev"'){
            page2= item[0]
          }
        }
        )
      })
      console.log(page)
      console.log(page2)
      yield put(getDemandadosSuccess(data.data))
      yield put(setActualPage(payload.page-1))
      yield put(changeSiguiente(page))
      yield put(changeAnterior(page2))
      break;
    case 403:
      yield put(auth.actions.logout())
      break;
    default:
      break;
  } 

}

function* getDemandadosSagaUltim(payload) {
  console.log('OBTENIENDO DEMANDADOS ULTIM XD');
  const config = {
    headers: {
      Authorization: 'Bearer ' + payload.token,
      Accept: 'application/json',
    },
    params: {
      'idEmbargo': payload.id
    }
  };
  const path= payload.path.replace(/[<>]/g, '')
  
   const data = yield axios.get(path, config)
    .then(response => response)
    .catch(err => err.response)
  console.log(data)
  switch (data.status) {
    case 200:
      var separar = data.headers.links.split(",")
      const array = separar.map((item) => {
        return item.split(";")
      })
      var page=''
      var page2=''
      array.map((item) => {
        item.map((item1) => {
          if (item1.trim() === 'rel="next"') {
            page = item[0]
          }
          if(item1.trim()==='rel="prev"'){
            page2= item[0]
          }
        }
        )
      })
      const number_page= path.split('page=')[1].split('&')[0]
      yield put(getDemandadosSuccess(data.data))
      yield put(setActualPage(number_page))
      yield put(changeSiguiente(page))
      yield put(changeAnterior(page2))
      break;
    case 403:
      yield put(auth.actions.logout())
      break;
    default:
      break;
  } 

}
function* getDemandadosSagaFirst(payload) {
  console.log('OBTENIENDO DEMANDADOS FIRST XD');
  const config = {
    headers: {
      Authorization: 'Bearer ' + payload.token,
      Accept: 'application/json',
    },
    params: {
      'idEmbargo': payload.id
    }
  }; 
   const data = yield axios.get('https://bancow.finseiz.com/api/v1/demandados/list?page=0&size=20', config)
    .then(response => response)
    .catch(err => err.response)
  console.log(data)
  switch (data.status) {
    case 200:
      var separar = data.headers.links.split(",")
      const array = separar.map((item) => {
        return item.split(";")
      })
      var page=''
      var page2=''
      array.map((item) => {
        item.map((item1) => {
          if (item1.trim() === 'rel="next"') {
            page = item[0]
          }
          if(item1.trim()==='rel="prev"'){
            page2= item[0]
          }
        }
        )
      })
      console.log(page)
      console.log(page2)
      yield put(getDemandadosSuccess(data.data))
      yield put(setActualPage(0))
      yield put(changeSiguiente(page))
      yield put(changeAnterior(page2))
      break;
    case 403:
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
  const data = yield axios.post('https://bancow.finseiz.com/api/v1/embargos/confirm', {

    account: payload.data.account,
    address: payload.data.address,
    amount: payload.data.amount,
    city: payload.data.city,
    docId: payload.data.docId,
    documentDate: payload.data.documentDate,
    documentType: payload.data.documentType,
    embargoType: payload.data.embargoType,
    id: payload.data.id,
    reference: payload.data.reference,
    sender: payload.data.sender,



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
  console.log(data)
  switch (data.status) {
    case 200:
      yield put(nuevoMensaje('Embargo confirmado correctamente'))
      break;
    case 403:
      yield put(auth.actions.logout())
      break;
    default:
      yield put(nuevoMensaje('Embargo no pudo ser confirmado correctamente, contacte a soporte'))

      break;
  }

}
function* updateAllDemandadosSaga(payload){
  console.log('UPDATE ALLA')
  const config = {
    headers: {
      Authorization: 'Bearer ' + payload.token,
      Accept: 'application/json',
      "Content-Type": "application/json"
    },
  };
  const demandados = payload.demandados.map(demandado => {
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
        yield put(upadteAllRequestSuccess('Demandados actualizados correctamente'))
        break;
    
      default:
        yield put(upadteAllRequestSuccess('No se pudieron actualizar los demandados'))
        break;
    }
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
    case 403:
      yield put(auth.actions.logout())
      break;

    default:
      break;
  }
}
function* deleteDemandanteSaga(payload) {
  console.log('DELETE DEMANDANTE')
  console.log(payload)
  const config = {
    headers: {
      Authorization: 'Bearer ' + payload.token,
      Accept: 'application/json',
      "Content-Type": "application/json"
    },
  };
  const data = yield axios.delete('https://bancow.finseiz.com/api/v1/demandantes/' + payload.id, config)
    .then(response => response)
    .catch(error => error.response)
  console.log(data)
  switch (data.value) {
    case 403:
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
  try {

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
          yield put(newMensajeBounding('Demandados guardados correctamente'))
          yield put(changeDemandadosTablePorConfirmarFalse())
          yield put(getDemandadosUpdateTable(payload.id, payload.token))
          break;

        default:
          yield put(changeDemandadosTablePorConfirmarFalse())
          yield put(newMensajeBounding('Error al guardar demandados, verifique que los datos sean correctos, recuerde que algunos campos son extrictamente numéricos'))
          break;
      }
    }
  } catch (err) {
    yield put(changeDemandadosTablePorConfirmarFalse())
    yield put(newMensajeBounding('Error al guardar demandados, verifique que los datos sean correctos, recuerde que algunos campos son extrictamente numéricos' + err))
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

  var demandados = [payload.data, ...payload.demandados]
  const demandadosReq = demandados.map(demandado => {
    const tipo = demandado.tipoIdentificacion == 'NO_SELECCIONADO' ? null : demandado.tipoIdentificacion
    console.log(tipo)
    console.log(demandado.tipoIdentificacion)
    return ({
      amount: demandado.montoAEmbargar,
      expedient: demandado.expediente,
      fullname: demandado.nombres,
      id: String(demandado.id).includes('local') ? null : demandado.id,
      identification: demandado.identificacion,
      page: demandado.page,
      typeIdentification: tipo == 'CEDULA_EXTRANJERA' ? 'CEDULA_EXTRANJERIA' : tipo
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
        yield put(newMensajeBounding('Demandado agregado correctamente'))
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
        yield put(newMensajeBounding('No se pudo guardar correctamente el demandado, por favor, verifique que los datos sean consistentes. Recuerde que hay campos solamente númericos'))
        const data2 = yield axios.get('https://bancow.finseiz.com/api/v1/demandados/list', config)
          .then(response => response)
          .catch(err => err.response)
        console.log(data2)
        switch (data2.status) {
          case 200:
            yield put(getDemandadosUpdateTableSuccess(data2.data));
            break;

          default:
            break;
        }
        break;
    }


  }
}
function* crearDemandanteSaga(payload) {
  console.log('GET demandado');
  const config = {
    headers: {
      Authorization: 'Bearer ' + payload.token,
      Accept: 'application/json',
    },

  };
  var demandantesReq = [payload.data, ...payload.demandantes]
  console.log(demandantes)
  const demandantes = demandantesReq.map(demandante => {
    return ({
      ...demandante,
      id: String(demandante.id).includes('local') ? null : demandante.id,
    })
  })
  if (demandantes.length > 0) {
    const data1 = yield axios.post('https://bancow.finseiz.com/api/v1/demandantes/save', {

      demandantes,
      idEmbargo: payload.id

    }, config)
      .then(response => response)
      .catch(err => err.response)
    console.log(data1)
    switch (data1.status) {
      case 201:
        const data = yield axios.get('https://bancow.finseiz.com/api/v1/embargos/' + payload.id, config)
          .then(response => response)
          .catch(err => err.response)
        console.log(data)
        switch (data.status) {
          case 200:
            yield put(getDemandantesUpdateTableSuccess(data.data.plaintiffs))
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
    if (demandado.id == payload.id) {
      return ({
        amount: payload.data.montoAEmbargar,
        expedient: demandado.expediente,
        fullname: payload.data.nombres,
        id: payload.id,
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
function* updateDemandanteSaga(payload) {
  console.log('UPDATE DEMANDANTE');
  console.log(payload.data)
  const config = {
    headers: {
      Authorization: 'Bearer ' + payload.token,
      Accept: 'application/json',
    },
  };
  const data = yield axios.put('https://bancow.finseiz.com/api/v1/demandantes/{id}', {

    id: payload.id,
    identificacion: payload.data.identificacion,
    nombres: payload.data.nombres

  }, config)
    .then(response => response)
    .catch(err => err.response)
  console.log(data)
}

function* updateEmbargoSaga(payload) {
  console.log('UPDATE EMBARGO');
  console.log(payload.data)
  const config = {
    headers: {
      Authorization: 'Bearer ' + payload.token,
      Accept: 'application/json',
    },
  };
  const data = yield axios.put('https://bancow.finseiz.com/api/v1/embargos', {
    account: payload.data.account,
    address: payload.data.address,
    amount: payload.data.amount,
    city: payload.data.city,
    docId: payload.data.docId,
    documentDate: payload.data.documentDate,
    documentType: payload.data.documentType,
    embargoType: payload.data.embargoType,
    id: payload.data.id,
    reference: payload.data.reference,
    sender: payload.data.sender

  }, config)
    .then(response => response)
    .catch(err => err.response)
  console.log(data)
  switch (data.status) {
    case 200:
      yield put(nuevoMensaje('Embargo actualizado correctamente'))
      break;

    default:
      yield put(nuevoMensaje('Error al actualizar embargo, contacte al administrador'))
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
    takeEvery(CONFIRMAR_EMBARGO, confirmarEmbargoSaga),
    takeEvery(DELETE_DEMANDADO, eliminarDemandadoSaga),
    takeEvery(SAVE_DEMANDADOS, saveDemandadosSaga),
    takeEvery(CREATE_DEMANDADO, crearDemandadoSaga),
    takeEvery(CREATE_DEMANDANTE, crearDemandanteSaga),
    takeEvery(UPDATE_DEMANDADO, updateDemandadoSaga),
    takeEvery(UPDATE_DEMANDANTE, updateDemandanteSaga),

    takeEvery(DELETE_DEMANDANTE, deleteDemandanteSaga),
    takeEvery(UPDATE_EMBARGO, updateEmbargoSaga),
    takeEvery(GET_DEMANDADOS_SIGUIENTE,getDemandadosSagaSiguiente),
    takeEvery(GET_DEMANDADOS_ANTERIOR, getDemandadosSagaAnterior),
    takeEvery(UPDATE_ALL_REQUEST, updateAllDemandadosSaga),
    takeEvery(GET_DEMANDADOS_FIRST_PAGE, getDemandadosSagaFirst),
    takeEvery(GET_DEMANDADOS_ULTIM_PAGE, getDemandadosSagaUltim),


  ])
}

const embargosSagas = [
  fork(embargosRootSaga),
];

export default embargosSagas