
import * as types from '../constants/excelConst';

export const uploadExcel=(data, id, token)=>({
    type: types.UPLOAD_EXCEL,
    data,
    id,
    token
});
export const uploadExcelSuccess=(data)=>({
    type: types.UPLOAD_EXCEL_SUCCESS,
    data
});

export const mensajeExcel=(msj)=>({
    type: types.MENSAJE_EXCEL,
    msj
});
export const resetMensaje=()=>({
    type: types.RESET_MENSAJE_EXCEL,

});

export const getPreview=(id, token)=>({
    type: types.GET_PREVIEW,
    id,
    token
});

export const getPreviewSuccess=(data)=>({
    type: types.GET_PREVIEW_SUCCESS,
    data
});

export const loadDemandados=(data, id, token)=>({
    type:types.LOAD_DEMANDADOS,
    data,
    id,
    token
})
export const loadDemandadosSuccess=()=>({
    type:types.LOAD_DEMANDADOS_SUCCESS,

})



