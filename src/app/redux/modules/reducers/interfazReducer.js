
import { ASIDE_HOVER,ASIDE_NO_HOVER } from '../../constants/interfazConst';

export const InterfazState = {
    hover:false
}
export default function interfazReducer(state = InterfazState, action = {}) {
    switch (action.type) {
        case ASIDE_HOVER:
            return {
                ...state,
                hover:true,
            };
        case ASIDE_NO_HOVER:
            return {
                ...state,
                hover: false,
            };

        default:
            return state;
    }
}