import React, { useMemo } from "react";
import { useSelector } from "react-redux";
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
const colors = [
  "#252525",
  "#525252",
  "#737373",
  "#969696",
  "#bdbdbd",
  "#d9d9d9",
  "#f0f0f0"
];

export default function Dashboard() {
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
          <Tarjet nombre="Subir oficio" width="210px" height="141px" number="10">
            <FaUpload color="#BDD535" size="3em" />
          </Tarjet>
        </Link>

        <Link to="/listar/no-confirmados">
          <Tarjet nombre="Confirmar" width="210px" height="141px" number="75">
            <FaEye color="#BDD535" size="3em" />
          </Tarjet>
        </Link>
        <Link to="/listar/confirmados">
          <Tarjet nombre="Confirmados" width="210px" height="141px" number="350">
            <FaCheck color="#BDD535" size="3em" />
          </Tarjet>
        </Link>
        <Link to="/listar/todos">
          <Tarjet nombre="Buscar" width="210px" height="141px" number="650">
            <FaSearch color="#BDD535" size="3em" />
          </Tarjet>
        </Link>
        <Link>
          <Tarjet nombre="Cartas" width="210px" height="141px" number="50">
            <MdEmail color="#BDD535" size="3em" />
          </Tarjet>
        </Link>
        <Link to="/listar/asignados">
          <Tarjet nombre="Asignados" width="210px" height="141px" number="12">
            <MdNotificationsActive color="#BDD535" size="3em" />
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

      <Portlet>
        <PortletBody fit={true}>
          <div className="row  row-col-separator-xl">
           
            <div className="col-xl-8">
            <AreaChart/>
            </div>
            <div className="col-xl-4">
            <Comparator/>
            
            </div>
          </div>
        </PortletBody>
      </Portlet>



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
          <RecentActivities />
        </div>
      </div>
    </>
  );
}
