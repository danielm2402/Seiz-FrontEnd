import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {getDemandados, getEmbargo} from '../../redux/actions/embargosAction'
class Revisar extends Component {
    componentDidMount(){
        console.log(this.props)
        this.props.handleEmbargo(this.props.match.params.id, this.props.token)
        this.props.handleDemandados(this.props.match.params.id, this.props.token)
    }
    render() {
        return (
            <div>
                {this.props.loadingEmbargo||this.props.loadingDemandados?
                <div>LOADINGGGG</div>:
                <div>Hola mundoOOO</div>}
            </div>
        )
    }
}


const mapStateToProps=(state)=>({
    token: state.auth.authToken,
    loadingEmbargo: state.EmbargosReducer.embargo.loading,
    loadingDemandados: state.EmbargosReducer.demandados.loading,
})
const mapDispatchToProps=(dispatch)=>({
    handleEmbargo: bindActionCreators(getEmbargo, dispatch),
    handleDemandados:bindActionCreators(getDemandados, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Revisar)
