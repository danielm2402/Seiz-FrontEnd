
import {MENSAJE_BOUNDING, RESET_MENSAJE_BOUNDING, CHANGE_DEMANDADOS_TABLE_POR_CONFIRMAR_TRUE,CHANGE_DEMANDADOS_TABLE_POR_CONFIRMAR_FALSE,TABLE_POINTS,MODE_SELECT,CHANGE_PAGE,POINTS, RESET_POINTS, NUEVA_REGION, RESET_REGION,TABLE_ULTIMO_FOCUS,OBTENER_DEMANDADOS_TABLE, OBTENER_DEMANDADOS_TABLE_SUCCESS
} from '../../constants/boundingConst.js';

export const Boundingstate = {
    boundigTable:{boundig: false, points: []},
    palabra:'',
    tabla:'',
    loadingDemandados:false, 
    page:1,
    mode: 'MANUAL',
    pointsModeTable:{ready:false, points:[]},
    DemandadosTablePorConfirmar: false,
    msj:{exist:false, msj:''}
}
export default function boundingReducer(state = Boundingstate, action={}){
    switch (action.type) {
        case POINTS:
            return{
                ...state,
                boundigTable:{boundig: true, points: action.points }
                
            }
        case RESET_POINTS:
            return{
                ...state,
                boundigTable:{boundig: false, points: []}
            }
        case NUEVA_REGION:
            return{
                ...state,
                palabra: action.palabra,

            }    
        case RESET_REGION:
            return{
                ...state,
                palabra:'',
                tabla:''
            }
        case TABLE_ULTIMO_FOCUS:
            return{
                ...state,
                tabla:action.table
            } 
        case OBTENER_DEMANDADOS_TABLE:
        return{
            ...state,
            pointsModeTable:{ready:false, points:[]},
            loadingDemandados:true
        }   
        case OBTENER_DEMANDADOS_TABLE_SUCCESS:
            return{
                ...state,
                loadingDemandados:false
            }   
        case CHANGE_PAGE:
            return{
                ...state,
                page:action.page
            }  
        case MODE_SELECT:
            return{
                ...state,
                mode:action.mode
            }    
        case TABLE_POINTS:
            return{
                ...state,
                pointsModeTable:{ready:true, points:action.points}
            }  
        case CHANGE_DEMANDADOS_TABLE_POR_CONFIRMAR_TRUE:
            return{
                ...state,
                DemandadosTablePorConfirmar:true
            }   
            case CHANGE_DEMANDADOS_TABLE_POR_CONFIRMAR_FALSE:
                return{
                    ...state,
                    DemandadosTablePorConfirmar:false
                }  
            case MENSAJE_BOUNDING:
                return{
                    ...state,
                    msj:{exist:true, msj:action.msj}
                } 
            case RESET_MENSAJE_BOUNDING:
                return{
                    ...state,
                    msj:{exist:false, msj:''}
                }                 
        default:
            return state;
    }
}