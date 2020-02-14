
import { POINTS, RESET_POINTS
} from '../../constants/boundingConst.js';

export const Boundingstate = {
    boundigTable:{boundig: false, points: []}
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
        
        default:
            return state;
    }
}