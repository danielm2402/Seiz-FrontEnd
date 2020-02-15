import * as types from '../constants/boundingConst';

export const changePoints=(points)=>({
    type: types.POINTS,
    points,
    
});
export const resetPoints=()=>({
    type: types.RESET_POINTS,
    
});
export const nuevaRegion=(palabra)=>({
    type: types.NUEVA_REGION,
    palabra
});
export const resetRegion=()=>({
    type: types.RESET_REGION,
});