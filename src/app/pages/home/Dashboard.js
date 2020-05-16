import React, { useMemo, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { bindActionCreators } from 'redux';

import { metronic } from "../../../_metronic";

import RecentActivities from "../../widgets/RecentActivities";
import MyRecentActivities from "../../widgets/MyRecentActivities";

import { FaCalendarAlt } from "react-icons/fa";
import {
  Link
} from "react-router-dom";

import Tarjet from './Tarjet'
import './style.css'
import Details from './google-material/stadistics/Detalles'

import Comparator from './google-material/stadistics/Comparator'

import SimpleBarChar from './google-material/stadistics/SimpleBarChar'
import { getConteoEmbargos, getStatsRankingUser, getHistorial, getHistorialMe, getBarrasSemanales, statsMeMvp, getStadisticsUserGeneral, getPolygon } from '../../redux/actions/estadisticasAction'
import { CircularProgressbar } from 'react-circular-progressbar';
import { connect } from 'react-redux'
import TableSinConfirmar from './MaterialTableDemo'
import ChartArea from './google-material/stadistics/ChartArea'
import TableUsers from './TableUsers'
import 'react-circular-progressbar/dist/styles.css';
import { getEmbargosAsignados } from '../../redux/actions/embargosAction'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from "@material-ui/core/Input";
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';
import { makeStyles } from "@material-ui/core/styles";

const useInputStyles = makeStyles({
  underline: {
    "&:before": {
      // normal
      borderBottom: "1px solid #BDD535"
    },
    "&:after": {
      // focused
      borderBottom: `1px solid #BDD535`
    },
    "&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before": {
      // hover
      borderBottom: `1px solid #BDD535`
    }
  }
});
const colors = [
  "#252525",
  "#525252",
  "#737373",
  "#969696",
  "#bdbdbd",
  "#d9d9d9",
  "#f0f0f0"
];

function Dashboard(props) {
  const firstRef = useRef('');
  const endRef = useRef('');
  const noFormatfirstRef = useRef('2/14/2020');
  const noFormatendRef = useRef('3/28/2020');
  const [grafica1, setGrafica1] = useState('SEMANA_ANTERIOR');
  const [grafica2, setGrafica2] = useState('SEMANA_ANTERIOR');
  const [grafica3, setGrafica3] = useState('SEMANA_ANTERIOR');
  const [grafica4, setGrafica4] = useState('SEMANA_ANTERIOR');
  const { brandColor, dangerColor, successColor, primaryColor } = useSelector(
    state => ({
      brandColor: metronic.builder.selectors.getConfig(
        state,
        "colors.state.brand"
      ),
      dangerColor: metronic.builder.selectors.getConfig(
        state,
        "colors.state.danger"
      ),
      successColor: metronic.builder.selectors.getConfig(
        state,
        "colors.state.success"
      ),
      primaryColor: metronic.builder.selectors.getConfig(
        state,
        "colors.state.primary"
      )
    })
  );

  const chartOptions = useMemo(
    () => ({
      chart1: {
        data: [10, 14, 18, 11, 9, 12, 14, 17, 18, 14],
        color: brandColor,
        border: 3
      },

      chart2: {
        data: [11, 12, 18, 13, 11, 12, 15, 13, 19, 15],
        color: dangerColor,
        border: 3
      },

      chart3: {
        data: [12, 12, 18, 11, 15, 12, 13, 16, 11, 18],
        color: successColor,
        border: 3
      },

      chart4: {
        data: [11, 9, 13, 18, 13, 15, 14, 13, 18, 15],
        color: primaryColor,
        border: 3
      }
    }),
    [brandColor, dangerColor, primaryColor, successColor]
  );
  const inputClasses = useInputStyles();
  return (
    <>
      <div className="cards-container">

        <Link to="/upload">
          <Tarjet nombre="Subir oficio" width="210px" height="141px" number={props.conteoEmbargos.loading ? 0 : props.conteoEmbargos.data.total}>
            <div style={{ width: '60%', height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            </div>
          </Tarjet>
        </Link>

        <Link to="/listar/no-confirmados">
          <Tarjet nombre="Sin Confirmar" width="210px" height="141px" number={props.conteoEmbargos.loading ? 0 : props.conteoEmbargos.data.PorConfirmar}>
            <div style={{ width: '60%', height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgressbar strokeWidth={5} value={props.conteoEmbargos.loading ? 0 : props.conteoEmbargos.data.porcentajePorConfirmar} text={props.conteoEmbargos.loading ? '0%' : (String(props.conteoEmbargos.data.porcentajePorConfirmar)).concat('%')} />
            </div>
          </Tarjet>
        </Link>
        <Link to="/listar/confirmados">
          <Tarjet nombre="Confirmados" width="210px" height="141px" number={props.conteoEmbargos.loading ? 0 : props.conteoEmbargos.data.confirmados}>
            <div style={{ width: '60%', height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgressbar strokeWidth={5} value={props.conteoEmbargos.loading ? 0 : props.conteoEmbargos.data.porcentajeConfirmados} text={props.conteoEmbargos.loading ? '0%' : (String(props.conteoEmbargos.data.porcentajeConfirmados)).concat('%')} />
            </div>
          </Tarjet>
        </Link>
        <Link to="/listar/todos">
          <Tarjet nombre="Buscar" width="210px" height="141px" number={props.conteoEmbargos.loading ? 0 : props.conteoEmbargos.data.total}>
            <div style={{ width: '60%', height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            </div>
          </Tarjet>
        </Link>
        <Link to="/listar/cartas">
          <Tarjet nombre="Cartas" width="210px" height="141px" number={props.conteoEmbargos.loading ? 0 : props.conteoEmbargos.data.cartas}>
            <div style={{ width: '60%', height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


            </div>
          </Tarjet>
        </Link>
        <Link to="/listar/asignados">
          <Tarjet nombre="Asignados" width="210px" height="141px" number={props.conteoEmbargos.loading ? 0 : props.conteoEmbargos.data.asignados}>
            <div style={{ width: '60%', height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgressbar strokeWidth={5} value={props.conteoEmbargos.loading ? 0 : props.conteoEmbargos.data.porcentajeAsignados} text={props.conteoEmbargos.loading ? '0%' : (String(props.conteoEmbargos.data.porcentajeAsignados)).concat('%')} />

            </div>
          </Tarjet>
        </Link>
      </div>
      <div className="container-general">
        <div className="container-left">
          <div className="container-embargos">
            <TableSinConfirmar token={props.token} nombre="Embargos" />
          </div>
          <div className="left-stadistics">
            <div style={{ paddingLeft: '10px', paddingTop: '10px', width: '100%', display: 'flex', justifyContent: 'start', backgroundColor: '#fff' }}>
              <Select
                labelId="demo-simple-select-label"
                name="grafica2"
                input={<Input classes={inputClasses} />}
                value={String(grafica2)}
                onChange={handleInput}
              >
                <MenuItem value={'SEMANA_ANTERIOR'}>SEMANA ANTERIOR</MenuItem>
                <MenuItem value={'MES_ANTERIOR'}>MES ANTERIOR</MenuItem>
                <MenuItem value={'DOS_MESES_ANTERIORES'}>DOS MESES ANTERIORES</MenuItem>
                <MenuItem value={'SEIS_MESES_ANTERIORES'}>SEIS MESES ANTERIORES</MenuItem>
              </Select>
            </div>
            <div className="comparator">

              <Comparator />
            </div>

          </div>
        </div>
        <div className="container-right">
          <div className="container-top">
            <div style={{ paddingLeft: '10px', paddingTop: '10px', width: '100%', display: 'flex', justifyContent: 'start', backgroundColor: '#fff' }}>
              <Select
                labelId="demo-simple-select-label"
                name="grafica1"
                input={<Input classes={inputClasses} />}
                value={String(grafica1)}
                onChange={handleInput}
              >
                <MenuItem value={'SEMANA_ANTERIOR'}>SEMANA ANTERIOR</MenuItem>
                <MenuItem value={'MES_ANTERIOR'}>MES ANTERIOR</MenuItem>
                <MenuItem value={'DOS_MESES_ANTERIORES'}>DOS MESES ANTERIORES</MenuItem>
                <MenuItem value={'SEIS_MESES_ANTERIORES'}>SEIS MESES ANTERIORES</MenuItem>
              </Select>
            </div>
            <div className="historico">
              <ChartArea />
            </div>

          </div>
          <div style={{ backgroundColor: '#fff' }} className="container-bottom">
            <div style={{ paddingLeft: '10px', paddingTop: '10px' }}>
              <DateRangePicker startDate={noFormatfirstRef.current} endDate={noFormatendRef.current} onApply={(e, picker) => {
                handleApply(e, picker)
                props.handleRanking(props.token, { init: firstRef.current.toISOString().split('T')[0], final: endRef.current.toISOString().split('T')[0] })
              }}>
                <a className="btn-herramienta"><FaCalendarAlt size={'1.3rem'} /></a>
              </DateRangePicker>
            </div>
            <TableUsers data={props.usersRanking} />
          </div>
        </div>
      </div>
      <div className="section-final">
        <div className="section-col-left">
        <div style={{ paddingLeft: '10px', paddingTop: '10px', paddingBottom:'10px', width: '100%', display: 'flex', justifyContent: 'start', backgroundColor: '#fff' }}>
              <Select
                labelId="demo-simple-select-label"
                name="grafica3"
                input={<Input classes={inputClasses} />}
                value={String(grafica3)}
                onChange={handleInput}
              >
                <MenuItem value={'SEMANA_ANTERIOR'}>SEMANA ANTERIOR</MenuItem>
                <MenuItem value={'MES_ANTERIOR'}>MES ANTERIOR</MenuItem>
                <MenuItem value={'DOS_MESES_ANTERIORES'}>DOS MESES ANTERIORES</MenuItem>
                <MenuItem value={'SEIS_MESES_ANTERIORES'}>SEIS MESES ANTERIORES</MenuItem>
              </Select>
            </div>
          <Details />
        </div>
        <div className="section-col-right">
          <RecentActivities />
        </div>
      </div>

      <div style={{ paddingTop: '10px' }} className="section-final">

        <div style={{ height: '400px', backgroundColor: '#ffffff' }} className="section-col-left">
          <div style={{display:'flex', flexDirection:'column', height:'400px'}}>
            <div style={{ paddingLeft: '10px', paddingTop: '10px', paddingBottom:'10px', width: '100%', display: 'flex', justifyContent: 'start', backgroundColor: '#fff' }}>
              <Select
                labelId="demo-simple-select-label"
                name="grafica4"
                input={<Input classes={inputClasses} />}
                value={String(grafica4)}
                onChange={handleInput}
              >
                <MenuItem value={'SEMANA_ANTERIOR'}>SEMANA ANTERIOR</MenuItem>
                <MenuItem value={'MES_ANTERIOR'}>MES ANTERIOR</MenuItem>
                <MenuItem value={'DOS_MESES_ANTERIORES'}>DOS MESES ANTERIORES</MenuItem>
                <MenuItem value={'SEIS_MESES_ANTERIORES'}>SEIS MESES ANTERIORES</MenuItem>
              </Select>
            </div>
            <SimpleBarChar></SimpleBarChar>
            
          </div>
        </div>

        <div className="section-col-right">
          <MyRecentActivities />
        </div>
      </div>
    </>
  );
  function handleApply(event, picker) {
    console.log(picker.startDate.toDate())
    console.log(picker.endDate.toDate())
    firstRef.current = picker.startDate.toDate();
    endRef.current = picker.endDate.toDate();

  }
  function handleInput(e) {
    switch (e.target.name) {
      case 'grafica1':
        setGrafica1(e.target.value)
        props.handleBarrasSemanales(props.token, props.user, e.target.value)
        break;
      case 'grafica2':
        setGrafica2(e.target.value)
        break;
      case 'grafica3':
        setGrafica3(e.target.value)
        break;
      case 'grafica4':
        setGrafica4(e.target.value)
        break;

      default:
        break;
    }
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.authToken,
  embargos: state.EmbargosReducer.porConfirmar,
  conteoEmbargos: state.estadisticasReducer.conteo,
  usersRanking: state.estadisticasReducer.ranking,
  user: state.auth.user.username
})
const mapDispatchToProps = (dispatch) => ({
  getEmbargos: bindActionCreators(getEmbargosAsignados, dispatch),
  handleConteoEmbargos: bindActionCreators(getConteoEmbargos, dispatch),
  handleRanking: bindActionCreators(getStatsRankingUser, dispatch),
  handleHistorialGeneral: bindActionCreators(getHistorial, dispatch),
  handleHistorialMe: bindActionCreators(getHistorialMe, dispatch),
  handleBarrasSemanales: bindActionCreators(getBarrasSemanales, dispatch),
  handleMvp: bindActionCreators(statsMeMvp, dispatch),
  handleOthersStadistics: bindActionCreators(getStadisticsUserGeneral, dispatch),
  handlePolygon: bindActionCreators(getPolygon, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)