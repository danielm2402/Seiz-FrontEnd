import * as types from '../constants/estadisticasConst';

export const getConteoEmbargos=(token, user)=>({
    type: types.CONTEO_EMBARGOS,
    token,
    user
});
export const getConteoEmbargosSuccess=(data)=>({
    type: types.CONTEO_EMBARGOS_SUCCESS,
    data
});

export const getStatsUser=(token)=>({
    type: types.STATS_USER,
    token
});

export const getStatsUserSuccess=(data)=>({
    type: types.STATS_USER_SUCCESS,
   data
})

export const getStatsGeneral=(token)=>({
    type: types.STATS_GENERAL,
    token
});
export const getStatsGeneralSuccess=(data)=>({
    type: types.STATS_GENERAL_SUCCESS,
    data
});

export const getStatsRankingUser=(token)=>({
    type: types.STATS_RANKING_USER,
    token
});
export const getStatsRankingUserSuccess=(data)=>({
    type: types.STATS_RANKING_USER_SUCCESS,
    data
});



