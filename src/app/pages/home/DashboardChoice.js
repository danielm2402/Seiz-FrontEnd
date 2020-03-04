import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import { bindActionCreators } from 'redux';
import {getConteoEmbargos, getStatsRankingUser,getHistorial,getHistorialMe,getBarrasSemanales,statsMeMvp} from '../../redux/actions/estadisticasAction'
class DashboardChoice extends Component {
    componentDidMount(){
        this.props.handleConteoEmbargos(this.props.token, this.props.user)
        this.props.handleRanking(this.props.token)
        this.props.handleHistorialGeneral(this.props.token)
        this.props.handleHistorialMe(this.props.token, this.props.user)
        this.props.handleBarrasSemanales(this.props.token, this.props.user)
        this.props.handleMvp(this.props.token)
    }
    render() {
        return (
            <div>
                {this.props.auth=='ROLE_ADMIN'?(<Dashboard></Dashboard>):(<Dashboard></Dashboard>)}
                
            </div>
        )
    }
}
const mapStateToProps=(state)=>({
    token: state.auth.authToken,
    auth: state.auth.user.authorities[0].authority,
    user: state.auth.user.username
})
const mapDispatchToProps=(dispatch)=>({
    handleConteoEmbargos: bindActionCreators(getConteoEmbargos,dispatch),
    handleRanking: bindActionCreators(getStatsRankingUser, dispatch),
    handleHistorialGeneral: bindActionCreators(getHistorial, dispatch),
    handleHistorialMe:bindActionCreators(getHistorialMe,dispatch),
    handleBarrasSemanales: bindActionCreators(getBarrasSemanales,dispatch),
    handleMvp: bindActionCreators(statsMeMvp, dispatch)
    
})
export default connect(mapStateToProps, mapDispatchToProps)(DashboardChoice)
