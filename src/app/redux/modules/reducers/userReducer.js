
import { GET_USER, GET_USER_SUCCESS, NUEVO_MENSAJE,RESET_MENSAJE } from '../../constants/userConst';

export const Authstate = {
    loading: true,
    user: {},
    mensaje:{exist:false, msj:''}
}
export default function authReducer(state = Authstate, action = {}) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                loading: true,
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.data,
                loading: false,
            };
        case NUEVO_MENSAJE:
            return{
                ...state,
                mensaje:{exist:true, msj:action.mensaje}
            } ;
        case RESET_MENSAJE:
            return{
                ...state,
                mensaje:{exist:false, msj:''}
            }    
        default:
            return state;
    }
}