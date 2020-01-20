
import { UPLOAD_REQUEST, UPLOAD_REQUEST_SUCCESS, UPLOAD_REQUEST_FAILED, ADD_FILE
} from '../../constants/UploadConsts';

export const Authstate = {
    loading:false,
    docs:[],
    files:[]
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
                loading:false,
                files:[]
            }    
        case UPLOAD_REQUEST_FAILED:
            return{
                ...state,
                loading:false
            }    
        case ADD_FILE:
            return{
                ...state,
                files:action.file
            }    
        default:
            return state;
    }
}