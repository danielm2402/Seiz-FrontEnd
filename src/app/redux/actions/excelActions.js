
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

