
import { GET_USER, GET_USER_SUCCESS } from '../../constants/userConst';

export const Authstate = {
    loading: true,
    user: {},
}
export default function authReducer(state = Authstate, action = {}) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                loading: true,
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.data,
                loading: false,
            };

        default:
            return state;
    }
}