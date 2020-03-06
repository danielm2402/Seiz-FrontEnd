import { UPLOAD_EXCEL, MENSAJE_EXCEL, RESET_MENSAJE_EXCEL, UPLOAD_EXCEL_SUCCESS } from '../../constants/excelConst';

export const excelState = {
    upload: { loading: false, data: {} },
    mensaje: { exist: false, msj: '' }
}
export default function excelReducer(state = excelState, action = {}) {
    switch (action.type) {
        case UPLOAD_EXCEL:
            return {
                ...state,
                upload: { loading: true, data: [] },
            };
        case UPLOAD_EXCEL_SUCCESS:
            return {
                ...state,
                upload: { loading: false, data: action.data },
            };

        case MENSAJE_EXCEL:
            return {
                ...state,
                mensaje: { exist: true, msj: action.msj }
            };
        case RESET_MENSAJE_EXCEL:
            return {
                ...state,
                mensaje: { exist: false, msj: '' }
            };

        default:
            return state;
    }
}