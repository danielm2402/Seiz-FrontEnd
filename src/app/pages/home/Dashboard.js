import React, { useMemo,useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { bindActionCreators } from 'redux';
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar
} from "../../partials/content/Portlet";
import { metronic } from "../../../_metronic";
import QuickStatsChart from "../../widgets/QuickStatsChart";
import OrderStatisticsChart from "../../widgets/OrderStatisticsChart";
import OrdersWidget from "../../widgets/OrdersWidget";
import SalesBarChart from "../../widgets/SalesBarChart";
import DownloadFiles from "../../widgets/DownloadFiles";
import NewUsers from "../../widgets/NewUsers";
import LatestUpdates from "../../widgets/LatestUpdates";
import BestSellers from "../../widgets/BestSellers";
import RecentActivities from "../../widgets/RecentActivities";
import MyRecentActivities from "../../widgets/MyRecentActivities";
import PortletHeaderDropdown from "../../partials/content/CustomDropdowns/PortletHeaderDropdown";
import { MdVideoLibrary, MdFileUpload, MdFileDownload, MdCloudUpload, MdSearch, MdEmail, MdNotificationsActive } from "react-icons/md";
import { FaSearch, FaCheck, FaUpload, FaEye } from "react-icons/fa";
import {
  Link
} from "react-router-dom";
import { VictoryPie, VictoryChart, VictoryLine, VictoryGroup, VictoryBar } from "victory";
import Tarjet from './Tarjet'
import './style.css'
import Details from './google-material/stadistics/Detalles'
import Pie from './google-material/stadistics/Pie'
import Comparator from './google-material/stadistics/Comparator'
import AreaChart from './google-material/stadistics/AreaChart'
import SimpleBarChar from './google-material/stadistics/SimpleBarChar'
import TarjetInficator from './google-material/stadistics/TarjetIndicator'
import { CircularProgressbar } from 'react-circular-progressbar';
import { connect } from 'react-redux'
import TableSinConfirmar from './MaterialTableDemo'
import ChartArea from './google-material/stadistics/ChartArea'
import TableUsers from './TableUsers'
import 'react-circular-progressbar/dist/styles.css';
import {getEmbargosAsignados} from '../../redux/actions/embargosAction'
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
 
  return (
    <>
      <div className="cards-container">

        <Link to="/upload">
          <Tarjet nombre="Subir oficio" width="210px" height="141px" number={props.conteoEmbargos.loading?0:props.conteoEmbargos.data.total}>
            <div style={{width:'60%', height:'70%', display:'flex', justifyContent:'center', alignItems:'center'}}>
         
          </div>
          </Tarjet>
        </Link>

        <Link to="/listar/no-confirmados">
          <Tarjet nombre="Sin Confirmar" width="210px" height="141px"number={props.conteoEmbargos.loading?0:props.conteoEmbargos.data.PorConfirmar}>
          <div style={{width:'60%', height:'70%', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <CircularProgressbar strokeWidth={5}value={props.conteoEmbargos.loading?0:props.conteoEmbargos.data.porcentajePorConfirmar} text={props.conteoEmbargos.loading?'0%':(String(props.conteoEmbargos.data.porcentajePorConfirmar)).concat('%')} />
          </div>
          </Tarjet>
        </Link>
        <Link to="/listar/confirmados">
          <Tarjet nombre="Confirmados" width="210px" height="141px" number={props.conteoEmbargos.loading?0:props.conteoEmbargos.data.confirmados}>
          <div style={{width:'60%', height:'70%', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <CircularProgressbar strokeWidth={5} value={props.conteoEmbargos.loading?0:props.conteoEmbargos.data.porcentajeConfirmados} text={props.conteoEmbargos.loading?'0%':(String(props.conteoEmbargos.data.porcentajeConfirmados)).concat('%')} />
          </div>
          </Tarjet>
        </Link>
        <Link to="/listar/todos">
          <Tarjet nombre="Buscar" width="210px" height="141px" number={props.conteoEmbargos.loading?0:props.conteoEmbargos.data.total}>
          <div style={{width:'60%', height:'70%', display:'flex', justifyContent:'center', alignItems:'center'}}>
         
          </div>
          </Tarjet>
        </Link>
        <Link>
          <Tarjet nombre="Cartas" width="210px" height="141px" number={props.conteoEmbargos.loading?0:props.conteoEmbargos.data.cartas}>
          <div style={{width:'60%', height:'70%', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <CircularProgressbar strokeWidth={5}value={props.conteoEmbargos.loading?0:props.conteoEmbargos.data.porcentajeCartas} text={props.conteoEmbargos.loading?'0%':(String(props.conteoEmbargos.data.porcentajeCartas)).concat('%')} />
          
          </div>
          </Tarjet>
        </Link>
        <Link to="/listar/asignados">
          <Tarjet nombre="Asignados" width="210px" height="141px" number={props.conteoEmbargos.loading?0:props.conteoEmbargos.data.asignados}>
          <div style={{width:'60%', height:'70%', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <CircularProgressbar strokeWidth={5}value={props.conteoEmbargos.loading?0:props.conteoEmbargos.data.porcentajeAsignados} text={props.conteoEmbargos.loading?'0%':(String(props.conteoEmbargos.data.porcentajeAsignados)).concat('%')} />
          
          </div>
          </Tarjet>
        </Link>
      </div>

    {/*   <div className="row">
        <div className="col-xl-8">
        <AreaChart/>
        </div>
        <div className="col-xl-4">
        <Comparator/>
        </div>
      </div> */}
      <div className="container-general">
      <div className="container-left">
        <div className="container-embargos">
        <TableSinConfirmar token={props.token} nombre="Embargos" />
        </div>
        <div className="left-stadistics">
           <div className="comparator">
          <Comparator/>
          </div> 
          {/* <div className="indicator">
          <Details/>
          </div> */}
        </div>
      </div>
      <div className="container-right">
          <div className="container-top">
            <div className="historico">
              <ChartArea/>
            </div>
            <div className="confirmar">
            <CircularProgressbar strokeWidth={5}value={props.conteoEmbargos.loading?0:props.conteoEmbargos.data.porcentajeAsignados} text={props.conteoEmbargos.loading?'0%':(String(props.conteoEmbargos.data.porcentajeAsignados)).concat('%')}></CircularProgressbar>
            </div>
          </div>
          <div className="container-bottom">
            <TableUsers data={props.usersRanking}/>
          </div>
      </div>
      </div>

      {/* <Portlet>
        <PortletBody fit={true}>
          <div className="row  row-col-separator-xl">
           
            <div className="col-xl-6">
            <AreaChart/>
            </div>
            <div className="col-xl-4">
            <Comparator/>
            
            </div>
            <div className="col-xl-2">
            <Comparator/>
            
            </div>
          </div>
        </PortletBody>
      </Portlet> */}



      {/* <div className="row">
        <div className="col-xl-8"></div>
        <div className="col-xl-4">
          <AuthorsProfit />
        </div>
      </div> */}

      <div className="row">
        <div className="col-xl-8">
            <Details/>
        </div>
        <div className="col-xl-4">
          <RecentActivities />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-8">
        <div className="kt-portlet kt-portlet--height-fluid">
          <SimpleBarChar></SimpleBarChar>
          </div>
        </div>
        <div className="col-xl-4">
          <MyRecentActivities />
        </div>
      </div>
    </>
  );
}

const mapStateToProps=(state)=>({
  token: state.auth.authToken,
embargos: state.EmbargosReducer.porConfirmar,
conteoEmbargos: state.estadisticasReducer.conteo,
usersRanking: state.estadisticasReducer.ranking
})
const mapDispatchToProps=(dispatch)=>({
  getEmbargos: bindActionCreators(getEmbargosAsignados,dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)