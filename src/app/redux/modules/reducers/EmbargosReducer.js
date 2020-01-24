
import {GET_DEMANDADOS_SUCCESS, GET_EMBARGO_SUCCESS, GET_EMBARGOS_CONFIRMADOS,GET_EMBARGO, GET_DEMANDADOS, GET_EMBARGOS_CONFIRMADOS_SUCCESS, GET_EMBARGOS_POR_CONFIRMAR, GET_EMBARGOS_POR_CONFIRMAR_SUCCESS,
GET_EMBARGOS_ASIGNADOS, GET_EMBARGOS_ASIGNADOS_SUCCESS, GET_EMBARGOS_ALL, GET_EMBARGOS_ALL_SUCCESS
} from '../../constants/EmbargosConst';

export const Authstate = {
    loading:true,
    confirmados:[],
    porConfirmar:[],
    asignados:[],
    all:[],
    embargo:{loading:true, data:{}, document:null, json:null},
    demandados:{loading:true, data:{}}
    
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
        case GET_EMBARGO:
            return{
                ...state,
                embargo:{loading:true, data:{}}
            }
        case GET_DEMANDADOS:
            return{
                ...state,
                demandados:{loading:true,data:[]}
            }
        case GET_DEMANDADOS_SUCCESS:
            return{
                ...state,
                demandados:{loading:false, data:action.data}
            } 
        case GET_EMBARGO_SUCCESS:
            return{
                ...state,
                embargo:{loading:false, data:action.data, document:action.document, json:action.json}
            }           

        default:
            return state;
    }
}