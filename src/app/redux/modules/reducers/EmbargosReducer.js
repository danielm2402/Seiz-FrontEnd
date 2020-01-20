
import { GET_EMBARGOS_CONFIRMADOS, GET_EMBARGOS_CONFIRMADOS_SUCCESS
} from '../../constants/EmbargosConst';

export const Authstate = {
    loading:true,
    confirmados:[]
    
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
            }    
        default:
            return state;
    }
}