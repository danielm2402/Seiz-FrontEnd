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

export const getStatsRankingUser=(token, fecha)=>({
    type: types.STATS_RANKING_USER,
    token,
    fecha
});
export const getStatsRankingUserSuccess=(data)=>({
    type: types.STATS_RANKING_USER_SUCCESS,
    data
});

export const statsMeMvp=(token)=>({
    type: types.STATS_ME_MVP,
    token
});
export const statsMeMvpSuccess=(data)=>({
    type: types.STATS_ME_MVP_SUCCESS,
    data
});

export const getHistorial=(token)=>({
    type: types.GET_HISTORIAL,
    token
});
export const getHistorialSuccess=(data)=>({
    type: types.GET_HISTORIAL_SUCCESS,
    data
});

export const getHistorialMe=(token, user)=>({
    type: types.GET_HISTORIAL_ME,
    token,
    user
});
export const getHistorialSuccessMe=(data)=>({
    type: types.GET_HISTORIAL_SUCCESS_ME,
    data
});


export const getBarrasSemanales=(token, user, rango)=>({
    type: types.GET_BARRAS_SEMANALES,
    token,
    user,
    rango
});
export const getBarrasSemanalesSuccess=(data)=>({
    type: types.GET_BARRAS_SEMANALES_SUCCESS,
    data
});

export const getStadisticsUserGeneral=(token)=>({
    type: types.GET_ESTADISTICAS_USER_GENERAL,
    token,
});
export const getStadisticsUserGeneralSuccess=(data)=>({
    type: types.GET_ESTADISTICAS_USER_GENERAL_SUCCESS,
    data
});

export const getPolygon=(token, user)=>({
    type: types.GET_POLYGON,
    token,
    user
});
export const getPolygonSuccess=(data)=>({
    type: types.GET_POLYGON_SUCCESS,
    data
});










