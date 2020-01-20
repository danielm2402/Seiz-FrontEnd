import * as types from '../constants/EmbargosConst';

export const getEmbargosConfirmados=(token)=>({
    type: types.GET_EMBARGOS_CONFIRMADOS,
    token
});
export const getEmbargosConfirmadosSuccess=(data)=>({
    type: types.GET_EMBARGOS_CONFIRMADOS_SUCCESS,
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


