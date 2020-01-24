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
      <div className="row">
        <div className="contenedor1">
          <div className="row contenedor">

            <div className="columna">
              <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
                <Link to="/upload/oficio">
                  <PortletBody fluid={true}>
                    <div className="card-item">
                      <QuickStatsChart
                        value={50}
                        desc="Subir Oficio"
                        color={chartOptions.chart1.color}
                        border={chartOptions.chart1.border}
                      />
                      <MdFileUpload style={{ width: '50px', height: '50px' }} />
                    </div>
                  </PortletBody>
                </Link>
              </Portlet>

              <div className="kt-space-20" />

              <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
                <Link to="/listar/no-confirmados">
                  <PortletBody fluid={true}>
                    <div className="card-item">
                      <QuickStatsChart
                        value={10}
                        desc="Por Confirmar"
                        color={chartOptions.chart2.color}
                        border={chartOptions.chart2.border}
                      />
                      <FaCheck style={{ width: '50px', height: '50px' }} />
                    </div>

                  </PortletBody>
                </Link>

              </Portlet>
            </div>

            <div className="columna">
              <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
                <a href="">
                  <PortletBody fluid={true}>
                    <div className="card-item">
                      <QuickStatsChart
                        value="234"
                        desc="Descargar Embargos"

                        color={chartOptions.chart3.color}
                        border={chartOptions.chart3.border}
                      />
                      <MdFileDownload style={{ width: '50px', height: '50px' }} />
                    </div>
                  </PortletBody>
                </a>
              </Portlet>

              <div className="kt-space-20" />

              <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
                <Link to="/listar/confirmados">
                  <PortletBody fluid={true}>
                    <div className="card-item">
                      <QuickStatsChart
                        value="200"
                        desc="Confirmados"

                        color={chartOptions.chart4.color}
                        border={chartOptions.chart4.border}
                      />
                      <FaCheckDouble style={{ width: '40px', height: '40px' }} />
                    </div>
                  </PortletBody>
                </Link>

              </Portlet>
            </div>
            <div className="columna">
              <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
                <a href="">
                  <PortletBody fluid={true}>
                    <div className="card-item">
                      <QuickStatsChart
                        value="12"
                        desc="Cargar cuentas"

                        color={chartOptions.chart3.color}
                        border={chartOptions.chart3.border}
                      />
                      <MdCloudUpload style={{ width: '50px', height: '50px' }} />
                    </div>
                  </PortletBody>
                </a>
              </Portlet>

              <div className="kt-space-20" />

              <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
                <a href="">
                  <PortletBody fluid={true}>
                    <div className="card-item">
                      <QuickStatsChart
                        value="10"
                        desc="Cartas"

                        color={chartOptions.chart4.color}
                        border={chartOptions.chart4.border}
                      />
                      <MdEmail style={{ width: '50px', height: '50px' }} />
                    </div>
                  </PortletBody>
                </a>
              </Portlet>
            </div>
            <div className="columna">
              <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
                <Link to="/listar/todos">
                  <PortletBody fluid={true}>
                    <div className="card-item">
                      <QuickStatsChart
                        value="800"
                        desc="Buscar Embargos"

                        color={chartOptions.chart3.color}
                        border={chartOptions.chart3.border}
                      />
                      <MdSearch style={{ width: '50px', height: '50px' }} />
                    </div>
                  </PortletBody>
                </Link>
              </Portlet>

              <div className="kt-space-20" />

              <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
                <Link to="/listar/asignados">
                  <PortletBody fluid={true}>
                    <div className="card-item">
                      <QuickStatsChart
                        value="6"
                        desc="Asignados"
                        color={chartOptions.chart4.color}
                        border={chartOptions.chart4.border}
                      />
                      <MdNotificationsNone style={{ width: '50px', height: '50px' }} />
                    </div>
                  </PortletBody>
                </Link>
              </Portlet>
            </div>
          </div>
        </div>




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
