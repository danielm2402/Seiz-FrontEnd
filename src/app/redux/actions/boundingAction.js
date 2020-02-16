import * as types from '../constants/boundingConst';

export const changePoints=(points)=>({
    type: types.POINTS,
    points,
    
});
export const resetPoints=()=>({
    type: types.RESET_POINTS,
    
});
export const nuevaRegion=(palabra)=>({
    type: types.NUEVA_REGION,
    palabra
});
export const resetRegion=()=>({
    type: types.RESET_REGION,
});

export const obtenerDemandadosTable=(vertices, columns, id, token)=>({
    type: types.OBTENER_DEMANDADOS_TABLE,
    vertices,
    columns,
    id,
    token
});
export const obtenerDemandadosTableSuccess=(data)=>({
    type: types.OBTENER_DEMANDADOS_TABLE_SUCCESS,
    data
})