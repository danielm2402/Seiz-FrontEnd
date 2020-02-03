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


