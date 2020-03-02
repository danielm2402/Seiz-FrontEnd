
import {UPLOAD_MENSAJE,RESET_MENSAJE ,UPLOAD_REQUEST, UPLOAD_REQUEST_SUCCESS, UPLOAD_REQUEST_FAILED, ADD_FILE,UPDATE_LOADER,SET_POSITION_PROCESS
} from '../../constants/UploadConsts';

export const Authstate = {
    loading:true,
    docs:[],
    files:[],
    item:0,
    mensaje:{exist:false, mensaje:''}
}
export default function authReducer(state = Authstate, action={}){
    switch (action.type) {
        case UPDATE_LOADER:
            return{
                ...state,
                loading:true
            }
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
        case SET_POSITION_PROCESS:
            return{
                ...state,
                item:action.item
            }   
        case UPLOAD_MENSAJE:
            return{
                ...state,
                mensaje:{exist:true, mensaje:action.mensaje}
            }  
        case RESET_MENSAJE:
            return{
                ...state,
                mensaje:{exist:false, mensaje:''}
            }           
        default:
            return state;
    }
}