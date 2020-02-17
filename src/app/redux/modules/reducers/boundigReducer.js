
import { POINTS, RESET_POINTS, NUEVA_REGION, RESET_REGION,TABLE_ULTIMO_FOCUS
} from '../../constants/boundingConst.js';

export const Boundingstate = {
    boundigTable:{boundig: false, points: []},
    palabra:'',
    tabla:''
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
        default:
            return state;
    }
}