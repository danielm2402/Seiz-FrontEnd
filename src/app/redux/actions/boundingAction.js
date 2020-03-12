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
    palabra,
});
export const resetRegion=()=>({
    type: types.RESET_REGION,
});

export const obtenerDemandadosTable=(vertices, columns, id, page, token)=>({
    type: types.OBTENER_DEMANDADOS_TABLE,
    vertices,
    columns,
    id,
    page,
    token
});
export const obtenerDemandadosTableSuccess=(data)=>({
    type: types.OBTENER_DEMANDADOS_TABLE_SUCCESS,
    data
})

export const setUltimaTableFocus=(table)=>({
    type: types.TABLE_ULTIMO_FOCUS,
    table
})
export const setPage=(page)=>({
    type: types.CHANGE_PAGE,
    page
})




