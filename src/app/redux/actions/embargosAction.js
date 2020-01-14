import * as types from '../constants/EmbargosConst';

export const getEmbargos=(tipo, token)=>({
    type: types.GET_EMBARGOS,
    tipo,
    token
});
export const getEmbargosSuccess=(data)=>({
    type: types.GET_EMBARGOS_SUCCESS,
    data
});

