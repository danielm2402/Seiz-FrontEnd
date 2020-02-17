/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { connect } from "react-redux";
import { toAbsoluteUrl } from "../../../_metronic";
import HeaderDropdownToggle from "../content/CustomDropdowns/HeaderDropdownToggle";
import Avatar from 'react-avatar';
class UserProfile extends React.Component {
  componentDidMount(){
    console.log('AQUI EL AUTH')
    console.log(this.props.auth)
  }
  render() {
    const { user, showHi, showAvatar, showBadge } = this.props;

    return (
      <Dropdown className="kt-header__topbar-item kt-header__topbar-item--user" drop="down" alignRight>
        <Dropdown.Toggle
          as={HeaderDropdownToggle}
          id="dropdown-toggle-user-profile"
        >
          <div className="kt-header__topbar-user">
            {showHi && (
              <span className="kt-header__topbar-welcome kt-hidden-mobile">
                Hola,
              </span>
            )}

            {showHi && (
              <span className="kt-header__topbar-username kt-hidden-mobile">
                {this.props.auth.user.username}
              </span>
            )}

            {showAvatar &&<Avatar name={this.props.auth.user.username} size="40" /> }

            {showBadge && (
              <span className="kt-badge kt-badge--username kt-badge--unified-success kt-badge--lg kt-badge--rounded kt-badge--bold">
                {/* TODO: Should get from currentUser */}
                John Doe
              </span>
            )}
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
          {/** ClassName should be 'dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl' */}
          <div
            className="kt-user-card kt-user-card--skin-dark kt-notification-item-padding-x"
            style={{
              backgroundImage: `url(${toAbsoluteUrl("/media/misc/bg-1.jpg")})`
            }}
          >
            <div className="kt-user-card__avatar">
           <img alt="Pic" className="kt-hidden" src={'user.pic'} />
           <Avatar name={this.props.auth.user.username} size="60" /> 
            </div>
            <div className="kt-user-card__name">{this.props.auth.user.username}</div>
            <div className="kt-user-card__badge">
              <span className="btn btn-success btn-sm btn-bold btn-font-md">
                23 messages
              </span>
            </div>
          </div>
          <div className="kt-notification">
            <a className="kt-notification__item">
              <div className="kt-notification__item-icon">
                <i className="flaticon2-calendar-3 kt-font-success" />
              </div>
              <div className="kt-notification__item-details">
                <div className="kt-notification__item-title kt-font-bold">
                  Mi Perfíl
                </div>
                <div className="kt-notification__item-time">
                  Configuración de usuario
                </div>
              </div>
            </a>
           
            <div className="kt-notification__custom">
              <Link
                to="/logout"
                className="btn btn-label-brand btn-sm btn-bold"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(UserProfile);
