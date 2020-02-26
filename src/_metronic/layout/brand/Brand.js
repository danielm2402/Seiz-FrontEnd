/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import objectPath from "object-path";
import KTToggle from "../../_assets/js/toggle";
import * as builder from "../../ducks/builder";
import { ReactComponent as AngleDoubleLeftIcon } from "../assets/layout-svg-icons/Angle-double-left.svg";
import { ReactComponent as AngleDoubleRightIcon } from "../assets/layout-svg-icons/Angle-double-right.svg";

class Brand extends React.Component {
  ktToggleRef = React.createRef();

  componentDidMount() {
    // eslint-disable-next-line no-undef
    new KTToggle(this.ktToggleRef.current, this.props.toggleOptions);
    console.log('EL STOREEEEE')
    console.log(this.props.hover)
  }

  render() {
    return (
      <div
        className={`kt-aside__brand kt-grid__item ${this.props.brandClasses}`}
        id="kt_aside_brand"
      >
        <div className="kt-aside__brand-logo">
          <Link to="">
            <img alt="logo" src={this.props.headerLogo} />
          </Link>
         
        </div>
        {this.props.hover?<></>: <div style={{width:'100%',display:'flex', justifyContent:'center', alignItems:'center'}}><img height={'61px'} alt="logo" src='/media/logos/seiz-logo-collapse.png'/></div>}

       
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    brandClasses: builder.selectors.getClasses(store, {
      path: "brand",
      toString: true
    }),
    asideSelfMinimizeToggle: objectPath.get(
      store.builder.layoutConfig,
      "aside.self.minimize.toggle"
    ),
    headerLogo: builder.selectors.getLogo(store),
    headerStickyLogo: builder.selectors.getStickyLogo(store),
    toggleOptions: {
      target: "body",
      targetState: "kt-aside--minimize",
      togglerState: "kt-aside__brand-aside-toggler--active"
    },
    hover: store.interfazReducer.hover
  };
};

export default connect(mapStateToProps)(Brand);
