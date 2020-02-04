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
import { MdVideoLibrary, MdFileUpload, MdFileDownload, MdCloudUpload, MdSearch, MdEmail, MdNotificationsNone } from "react-icons/md";
import { FaCheckDouble, FaCheck } from "react-icons/fa";
import {
  Link
} from "react-router-dom";
import { VictoryPie, VictoryChart, VictoryLine, VictoryGroup, VictoryBar } from "victory";
import Tarjet from './Tarjet'
import './style.css'
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
            <Tarjet nombre="Subir oficio" width="200px" height="141px" number="10" />
          </Link>
         
          <Link to="/listar/no-confirmados">
            <Tarjet nombre="Por confirmar" width="200px" height="141px" number="75" />
          </Link>
          <Link to="/listar/confirmados">
            <Tarjet nombre="Confirmados" width="200px" height="141px" number="350" />
          </Link>
          <Link to="/listar/todos">
            <Tarjet nombre="Buscar Embargo" width="200px" height="141px" number="650" />
          </Link>
          <Link>
            <Tarjet nombre="Cartas" width="200px" height="141px" number="50" />
          </Link>
          <Link to="/listar/asignados">
            <Tarjet nombre="Embargos Asignados" width="200px" height="141px" number="12" />
          </Link>
        
         


      </div>
   
      <Portlet>
        <PortletBody fit={true}>
          <div className="row row-no-padding row-col-separator-xl">
            <div className="col-xl-4">
              <VictoryPie />
            </div>
            <div className="col-xl-4">
              <VictoryPie />
            </div>
            <div className="col-xl-4">
              <VictoryPie />
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
          <VictoryChart

          >
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" }
              }}
              data={[
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 5 },
                { x: 4, y: 4 },
                { x: 5, y: 7 }
              ]}
            />
          </VictoryChart>
        </div>
        <div className="col-xl-4">
          <RecentActivities />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-8">
          <VictoryChart>
            <VictoryGroup offset={20}
              colorScale={"qualitative"}
            >
              <VictoryBar
                data={[{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 5 }]}
              />
              <VictoryBar
                data={[{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 7 }]}
              />
              <VictoryBar
                data={[{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 9 }]}
              />
            </VictoryGroup>
          </VictoryChart>
        </div>
        <div className="col-xl-4">
          <RecentActivities />
        </div>
      </div>
    </>
  );
}
