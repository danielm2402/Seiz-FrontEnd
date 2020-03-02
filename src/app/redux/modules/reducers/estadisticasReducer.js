
import {
    CONTEO_EMBARGOS,STATS_RANKING_USER_SUCCESS, CONTEO_EMBARGOS_SUCCESS, STATS_USER, STATS_USER_SUCCESS, STATS_GENERAL, STATS_GENERAL_SUCCESS
} from '../../constants/estadisticasConst';

export const Authstate = {
    conteo: { loading: true, data: {} },
    users: { loading: true, data: [] },
    general: { loading: true, data: [] },
    ranking:[]
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
        default:
            return state;
    }
}
