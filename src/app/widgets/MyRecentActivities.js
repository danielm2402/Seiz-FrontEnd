/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { toAbsoluteUrl } from "../../_metronic/utils/utils";
import PortletHeaderDropdown from "../partials/content/CustomDropdowns/PortletHeaderDropdown";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {
  Link
} from "react-router-dom";
const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
};

function RecentActivities(props) {
  return (
    <>
      <div className="kt-portlet kt-portlet--height-fluid">
        <div className="kt-portlet__head">
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">Mis ultimos embargos asignados y confirmados</h3>
          </div>
         
        </div>
        <div className="kt-portlet__body">
          {/* style="max-height: 50vh;" */}
          <PerfectScrollbar
            options={perfectScrollbarOptions}
            style={{ maxHeight: "50vh", position: "relative" }}
          >
            <div className="kt-timeline-v2 ps ps--active-y">
              <div className="kt-timeline-v2__items kt-padding-top-25 kt-padding-bottom-30">
                {props.historial.length>0?
                  props.historial.map(item=>{
                    return(
                      <div className="kt-timeline-v2__item">
                      <span className="kt-timeline-v2__item-time"></span>
                      <div className="kt-timeline-v2__item-cricle">
                        <i className="fa fa-genderless kt-font-danger" />
                      </div>
                      <div className="kt-timeline-v2__item-text kt-padding-top-5">
                      ID: <Link to={`/view/${item.id}`}>{item.id}</Link> Remitente: {item.sender}
                      </div>
                      <div className="kt-list-pics kt-list-pics--sm kt-padding-l-20" />
                    </div>
                    )
                  })
                :<div className="kt-timeline-v2__item">
                <span className="kt-timeline-v2__item-time"></span>
                <div className="kt-timeline-v2__item-cricle">
                  <i className="fa fa-genderless kt-font-danger" />
                </div>
                <div className="kt-timeline-v2__item-text kt-padding-top-5">
                  No hay embargos recientes confirmados
                </div>
                <div className="kt-list-pics kt-list-pics--sm kt-padding-l-20" />
              </div>}
                
               
              </div>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    </>
  );
}
const mapStateToProps=(state)=>({
 historial: state.estadisticasReducer.myHistorial
})
const mapDispatchToProps=(dispatch)=>({
 
})

export default connect(mapStateToProps, null)(RecentActivities)
