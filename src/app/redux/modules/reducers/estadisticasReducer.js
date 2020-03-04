
import {GET_HISTORIAL_SUCCESS, GET_HISTORIAL_SUCCESS_ME,GET_BARRAS_SEMANALES_SUCCESS,
    CONTEO_EMBARGOS,STATS_RANKING_USER_SUCCESS, CONTEO_EMBARGOS_SUCCESS, STATS_USER, STATS_USER_SUCCESS, STATS_GENERAL, STATS_GENERAL_SUCCESS
} from '../../constants/estadisticasConst';

export const Authstate = {
    conteo: { loading: true, data: {} },
    users: { loading: true, data: [] },
    general: { loading: true, data: [] },
    ranking:[],
    historial:[],
    myHistorial:[],
    semanal:{general:[[],[],[],[],[],[]], user:[[],[],[],[],[],[]]}
}
export default function authReducer(state = Authstate, action = {}) {
    switch (action.type) {
        case CONTEO_EMBARGOS:
            return {
                ...state,
                conteo: { loading: true, data: {} },
            }
        case CONTEO_EMBARGOS_SUCCESS:
            return {
                ...state,
                conteo: { loading: false, data: action.data },
            }
        case STATS_USER:
            return {
                ...state,
                users: { loading: true, data: [] },
            }
        case STATS_USER_SUCCESS:
            return {
                ...state,
                users: { loading: false, data: action.data },
            }
        case STATS_GENERAL:
            return {
                ...state,
                general: { loading: true, data: [] }
            }
        case STATS_GENERAL_SUCCESS:
            return {
                ...state,
                general: { loading: false, data: action.data }
            }
        case STATS_RANKING_USER_SUCCESS:
            return{
                ...state,
                ranking:action.data
            }
        case GET_HISTORIAL_SUCCESS:
            return{
                ...state,
                historial:action.data
            }
        case GET_HISTORIAL_SUCCESS_ME:
            return{
                ...state,
                myHistorial:action.data
            }  
        case GET_BARRAS_SEMANALES_SUCCESS:
            return{
                ...state,
                semanal:{general:action.data.general, user:action.data.user}
            }              
        default:
            return state;
    }
}
