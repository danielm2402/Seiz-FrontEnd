import { Record } from 'immutable';
import { LOGIN_EMAIL_REQUEST, LOGIN_EMAIL_FAILED, LOGIN_EMAIL_SUCCESS, REGISTER_WITH_EMAIL, REGISTER_WITH_EMAIL_SUCCESS
,LOGOUT_SUCCESS} from '../../constants/authConst';
import { stat } from 'fs';
export const Authstate = {
    loggedIn:false,
    user:null,
    loading: false, 
    messageError:{exist:false, text:''}
    
}

export default function authReducer(state = Authstate, action={}){
    switch (action.type) {
        case LOGIN_EMAIL_REQUEST:
            return{
                ...state,
                loading:true,
            };
        case LOGIN_EMAIL_FAILED:
            return{
                ...state,
                loading:false,
                messageError: {exist:true, text:action.message}
            }
        case REGISTER_WITH_EMAIL:
            return{
                ...state,
                loading:true
            }   
        case REGISTER_WITH_EMAIL_SUCCESS:
            return{
                ...state,
                loading:false
            }    
        case LOGIN_EMAIL_SUCCESS:
            return{
                ...state,
                loading:false,
                loggedIn:true,
                user:{username: action.username, token: action.token, refreshToken: action.refreshToken, expiredTime: action.expiredTime } 
            }   
        case LOGOUT_SUCCESS:
            return{
                ...state,
                loggedIn:false,
                user: null
            }       
        default:
            return state;
    }
}