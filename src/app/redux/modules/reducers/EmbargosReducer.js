
import { GET_EMBARGOS_SUCCESS, GET_EMBARGOS
} from '../../constants/EmbargosConst';

export const Authstate = {
    loading:true,
    activos:[]
    
}
export default function authReducer(state = Authstate, action={}){
    switch (action.type) {
        case GET_EMBARGOS:
            return{
                ...state,
                loading:true,
            };
        case GET_EMBARGOS_SUCCESS:
            return{
                ...state,
                loading:false,
                activos:action.data
            }    
        default:
            return state;
    }
}