
import { GET_EMBARGOS_CONFIRMADOS, GET_EMBARGOS_CONFIRMADOS_SUCCESS, GET_EMBARGOS_POR_CONFIRMAR, GET_EMBARGOS_POR_CONFIRMAR_SUCCESS,
GET_EMBARGOS_ASIGNADOS, GET_EMBARGOS_ASIGNADOS_SUCCESS, GET_EMBARGOS_ALL, GET_EMBARGOS_ALL_SUCCESS
} from '../../constants/EmbargosConst';

export const Authstate = {
    loading:true,
    confirmados:[],
    porConfirmar:[],
    asignados:[],
    all:[]
    
}
export default function authReducer(state = Authstate, action={}){
    switch (action.type) {
        case GET_EMBARGOS_CONFIRMADOS:
            return{
                ...state,
                loading:true,
            };
        case GET_EMBARGOS_CONFIRMADOS_SUCCESS:
            return{
                ...state,
                loading:false,
                confirmados:action.data
            };
        case GET_EMBARGOS_POR_CONFIRMAR:
            return{
                ...state,
                loading:true,
            }  
        case GET_EMBARGOS_POR_CONFIRMAR_SUCCESS:
            return{
                ...state,
                loading:false,
                porConfirmar: action.data
            }
        case GET_EMBARGOS_ASIGNADOS:
            return{
                ...state,
                loading:true,
            }  ;
        case GET_EMBARGOS_ASIGNADOS_SUCCESS:
            return{
                ...state,
                loading:false,
                asignados:action.data
            }
        case GET_EMBARGOS_ALL:
            return{
                ...state,
                loading:true
            }   
        case GET_EMBARGOS_ALL_SUCCESS:
            return{
                ...state,
                all:action.data
            }                   
        default:
            return state;
    }
}