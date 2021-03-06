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

export const obtenerDemandadosTable=(vertices, columns, id, page, token, tipoIdentificacion)=>({
    type: types.OBTENER_DEMANDADOS_TABLE,
    vertices,
    columns,
    id,
    page,
    token,
    tipoIdentificacion
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

export const setMode=(mode)=>({
    type: types.MODE_SELECT,
    mode
})
export const setTablePoints=(points)=>({
    type: types.TABLE_POINTS,
    points
})
export const changeDemandadosTablePorConfirmarTrue=()=>({
    type: types.CHANGE_DEMANDADOS_TABLE_POR_CONFIRMAR_TRUE
})
export const changeDemandadosTablePorConfirmarFalse=()=>({
    type: types.CHANGE_DEMANDADOS_TABLE_POR_CONFIRMAR_FALSE
})

export const newMensajeBounding=(msj)=>({
type:types.MENSAJE_BOUNDING,
msj
})

export const resetMensajeBounding=()=>({
    type:types.RESET_MENSAJE_BOUNDING
})



