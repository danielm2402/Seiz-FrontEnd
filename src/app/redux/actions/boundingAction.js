import * as types from '../constants/boundingConst';

export const changePoints=(points)=>({
    type: types.POINTS,
    points,
    
});
export const resetPoints=()=>({
    type: types.RESET_POINTS,
    
});