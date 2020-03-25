
import {
    GET_DEMANDADOS_SUCCESS, CHANGE_SIGUIENTE, CHANGE_ANTERIOR, GET_DEMANDADOS_SUCCESS_TABLE,GET_EMBARGO_SUCCESS, GET_EMBARGOS_CONFIRMADOS, GET_EMBARGO, GET_DEMANDADOS, GET_EMBARGOS_CONFIRMADOS_SUCCESS, GET_EMBARGOS_POR_CONFIRMAR, GET_EMBARGOS_POR_CONFIRMAR_SUCCESS,
    GET_EMBARGOS_ASIGNADOS, GET_EMBARGOS_ASIGNADOS_SUCCESS, GET_EMBARGOS_ALL, GET_EMBARGOS_ALL_SUCCESS, UPDATE_DEMANDADO, UPDATE_DEMANDANTE,DELETE_DEMANDANTE,DELETE_DEMANDADO, CREATE_DEMANDANTE, CREATE_DEMANDADO
    ,NUEVO_MESANJE, RESET_MENSAJE, GET_DEMANDADOS_UPDATE_TABLE_SUCCESS, GET_DEMANDANTES_UPDATE_TABLE_SUCCESS
} from '../../constants/EmbargosConst';

export const Authstate = {
    loading: true,
    confirmados: [],
    porConfirmar: [],
    asignados: [],
    all: [],
    embargo: { loading: true, data: { plaintiffs: [] }, document: null, json: null, json1: null },
    demandados: { isUpdate:false ,loading: true, data: []},
    mensaje:{exist:false, msj:''},
    demandadosPathSiguiente:'',
    demandadosPathAnterior:'',

}
export default function authReducer(state = Authstate, action = {}) {
    switch (action.type) {
        case GET_EMBARGOS_CONFIRMADOS:
            return {
                ...state,
                loading: true,
            };
        case GET_EMBARGOS_CONFIRMADOS_SUCCESS:
            return {
                ...state,
                loading: false,
                confirmados: action.data
            };
        case GET_EMBARGOS_POR_CONFIRMAR:
            return {
                ...state,
                loading: true,
            }
        case GET_EMBARGOS_POR_CONFIRMAR_SUCCESS:
            return {
                ...state,
                loading: false,
                porConfirmar: action.data
            }
        case GET_EMBARGOS_ASIGNADOS:
            return {
                ...state,
                loading: true,
            };
        case GET_EMBARGOS_ASIGNADOS_SUCCESS:
            return {
                ...state,
                loading: false,
                asignados: action.data
            }
        case GET_EMBARGOS_ALL:
            return {
                ...state,
                loading: true
            }
        case GET_EMBARGOS_ALL_SUCCESS:
            return {
                ...state,
                all: action.data
            }
        case GET_EMBARGO:
            return {
                ...state,
                embargo: { loading: true, data: {} }
            }
        case GET_DEMANDADOS:
            return {
                ...state,
                demandados: {isUpdate:false,loading: true, data: [] }
            }
        
        case GET_DEMANDADOS_SUCCESS:
            return {
                ...state,
                demandados: { isUpdate:false, loading: false, data: action.data}
            }
        case GET_DEMANDADOS_SUCCESS_TABLE:
            return{
                ...state,
                demandados:{isUpdate:false, loading:false, data:[...state.demandados.data,...action.data]}
            }    
        case GET_DEMANDADOS_UPDATE_TABLE_SUCCESS:
            return{
                ...state,
                demandados: {isUpdate:false,loading: false, data: action.data}
            }
        case GET_DEMANDANTES_UPDATE_TABLE_SUCCESS:
            return{
                ...state,
                embargo: {...state.embargo, data: {...state.embargo.data, plaintiffs: action.data }},
            }       
        case GET_EMBARGO_SUCCESS:
            return {
                ...state,
                embargo: { loading: false, data: action.data, document: action.document, json: action.json, json1: action.json1 }
            }
        case UPDATE_DEMANDADO:
            return {
                ...state,
                demandados: {
                    loading: false, data:state.demandados.data.map(item => {
                        if (item.id === action.id) {
                            return {
                                ...item,
                                nombres: action.data.nombres,
                                tipoIdentificacion: action.data.tipoIdentificacion,
                                identificacion: action.data.identificacion,
                                montoAEmbargar: action.data.montoAEmbargar
                            }
                          
                        }
                        return item
                    })
                }
            }
        case UPDATE_DEMANDANTE:
            return {
                ...state,
                embargo: {
                    ...state.embargo, data: {
                        ...state.embargo.data, plaintiffs: [...state.embargo.data.plaintiffs.filter(item => item.id !== action.id), {
                            ...state.embargo.data.plaintiffs.find(element => element.id === action.id), fullname: action.data.nombres,
                            identificacion: action.data.identificacion

                        }]
                    }
                }

            }
        case DELETE_DEMANDADO:
            return{
                ...state,
                demandados:{loading:false, data:state.demandados.data.filter((item)=>item.id!==action.id)}
            }    
        case DELETE_DEMANDANTE:
            return{
                ...state,
                embargo:{...state.embargo, data:{...state.embargo.data, plaintiffs:state.embargo.data.plaintiffs.filter((item)=>item.id!==action.id)}}
            }
        case CREATE_DEMANDADO:
            return{
                ...state,
                demandados:{isUpdate:true,loading:false, data:[action.data,...state.demandados.data]}
            } 
        case CREATE_DEMANDANTE:
            return{
                ...state,
                embargo:{...state.embargo, data:{...state.embargo.data, plaintiffs:[action.data, ...state.embargo.data.plaintiffs]}}
                
            }   
        case NUEVO_MESANJE:
            return{
                ...state,
                mensaje:{exist:true, msj:action.data}
            }
        case RESET_MENSAJE:
            return{
                ...state,
                mensaje:{exist:false, msj:''}
            }    
        case CHANGE_SIGUIENTE:
            return{
                ...state,
                demandadosPathSiguiente: action.path
            }    
        case CHANGE_ANTERIOR:
            return{
                ...state,
                demandadosPathAnterior: action.path
            }     
        default:
            return state;
    }
}