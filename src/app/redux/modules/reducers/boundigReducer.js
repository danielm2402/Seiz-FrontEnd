
import { POINTS, RESET_POINTS, NUEVA_REGION, RESET_REGION
} from '../../constants/boundingConst.js';

export const Boundingstate = {
    boundigTable:{boundig: false, points: []},
    palabra:''
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
                palabra: action.palabra
            }    
        case RESET_REGION:
            return{
                ...state,
                palabra:''
            }
        default:
            return state;
    }
}