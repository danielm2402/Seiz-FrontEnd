import * as types from '../constants/EmbargosConst';

export const getEmbargosConfirmados=(token)=>({
    type: types.GET_EMBARGOS_CONFIRMADOS,
    token
});
export const getEmbargosConfirmadosSuccess=(data)=>({
    type: types.GET_EMBARGOS_CONFIRMADOS_SUCCESS,
    data
});
export const getEmbargosAll=(token)=>({
    type: types.GET_EMBARGOS_ALL,
    token
});
export const getEmbargosAllSuccess=(data)=>({
    type: types.GET_EMBARGOS_ALL_SUCCESS,
    data
});
export const getEmbargosPorConfirmar=(token)=>({
    type: types.GET_EMBARGOS_POR_CONFIRMAR,
    token
});
export const getEmbargosPorConfirmarSuccess=(data)=>({
    type: types.GET_EMBARGOS_POR_CONFIRMAR_SUCCESS,
    data
});

export const getEmbargosAsignados=(token, user)=>({
    type: types.GET_EMBARGOS_ASIGNADOS,
    token,
    user
});
export const getEmbargosAsignadosSuccess=(data)=>({
    type: types.GET_EMBARGOS_ASIGNADOS_SUCCESS,
    data
});
export const deleteEmbargo=(id, token, path)=>({
    type: types.DELETE_EMBARGO,
    id,
    token,
    path
});
export const getEmbargo=(id, token)=>({
    type: types.GET_EMBARGO,
    id,
    token
})
export const getDemandados=(id, token)=>({
    type:types.GET_DEMANDADOS,
    id,
    token
})

export const getEmbargoSuccess=(data, document, json, json1)=>({
    type:types.GET_EMBARGO_SUCCESS,
    data,
    document,
    json,
    json1
})
export const getDemandadosSuccess=(data)=>({
    type:types.GET_DEMANDADOS_SUCCESS,
    data
})

export const updateDemandando=(id, data, demandados, token, idDoc)=>({
    type:types.UPDATE_DEMANDADO,
    id,
    data,
    idDoc,
    token,
    demandados
})
export const updateDemandante=(id, data, token)=>({
    type:types.UPDATE_DEMANDANTE,
    id,
    data,
    token
})
export const deleteDemandante=(id, token)=>({
    type:types.DELETE_DEMANDANTE,
    id,
    token 
})
export const deleteDemandado=(id, token)=>({
    type:types.DELETE_DEMANDADO,
    id,
    token
})
export const addDemandado=(data, demandados, token, id)=>({
    type:types.CREATE_DEMANDADO,
    data,
    demandados,
    token,
    id
})
export const addDemandante=(data, demandantes, token, id)=>({
    type:types.CREATE_DEMANDANTE,
    data,
    demandantes,
    token,
    id
})
export const confirmarEmbargo=(data, token)=>({
    type:types.CONFIRMAR_EMBARGO,
    data, 
    token
})

export const nuevoMensaje=(data)=>({
    type:types.NUEVO_MESANJE,
    data, 
})
export const resetMensaje=()=>({
    type:types.RESET_MENSAJE
})
export const saveDemandados=(data, token,id)=>({
    type:types.SAVE_DEMANDADOS,
    data,
    token,
    id
})

export const getDemandadosUpdateTable=(id, token)=>({
    type:types.GET_DEMANDADOS_UPDATE_TABLE,
    id,
    token
})

export const getDemandadosUpdateTableSuccess=(data)=>({
    type:types.GET_DEMANDADOS_UPDATE_TABLE_SUCCESS,
    data
})
export const getDemandantesUpdateTableSuccess=(data)=>({
    type:types.GET_DEMANDANTES_UPDATE_TABLE_SUCCESS,
    data
})
export const updateEmbargo=(data, token)=>({
    type:types.UPDATE_EMBARGO,
    data,
    token
})







