import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'
class DashboardChoice extends Component {
    render() {
        return (
            <div>
                {this.props.auth=='ROLE_ADMIN'?(<Dashboard></Dashboard>):(<Dashboard></Dashboard>)}
                
            </div>
        )
    }
}
const mapStateToProps=(state)=>({
    auth: state.auth.user.authorities[0].authority
})
export default connect(mapStateToProps)(DashboardChoice)
