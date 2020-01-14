
import { UPLOAD_REQUEST, UPLOAD_REQUEST_SUCCESS, UPLOAD_REQUEST_FAILED
} from '../../constants/UploadConsts';

export const Authstate = {
    loading:true,
    docs:[]
    
}
export default function authReducer(state = Authstate, action={}){
    switch (action.type) {
        case UPLOAD_REQUEST:
            return{
                ...state,
                loading:true,
            };
        case UPLOAD_REQUEST_SUCCESS:
            return{
                ...state,
                loading:false
            }    
        case UPLOAD_REQUEST_FAILED:
            return{
                ...state,
                loading:false
            }    
        default:
            return state;
    }
}