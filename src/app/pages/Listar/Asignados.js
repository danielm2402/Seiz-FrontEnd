import React, { Component } from 'react'
import MaterialTableDemo from './MaterialTableDemo'
import TableAsignados from './tables/TableAsignados'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {getEmbargosAsignados} from '../../redux/actions/embargosAction'
class Confirmados extends Component {
    componentDidMount(){
        console.log('montando component')
        console.log(this.props.confirmados)
        this.props.handleRequestEmbargos(this.props.token, this.props.username)
    }
    componentDidUpdate(){
        console.log(this.props.confirmados)
    }
    render() {
        var columns=[
      
            {title:'Id', field:'id'},
            { title: 'Demandante', field: 'plaintiffs[0].fullname'},
            { title: 'Ciudad', field: 'city'},
            { title: 'Estado', field: 'status'},
            { title: 'Tipo', field: 'embargoType'},
            { title: 'Fecha de carga', field: 'createdAt'},
            { title: 'Fecha Oficio', field: 'documentDate'},
          ]
        return (
            <div>
                <TableAsignados nombre="Embargos" columns={columns} data={this.props.asignados} />
            </div>
        )
    }
}

const mapDispatchToProps=(dispatch)=>({
    handleRequestEmbargos: bindActionCreators(getEmbargosAsignados,dispatch)
})
const mapStateToProps=(state)=>({
    token: state.auth.authToken,
    username: state.auth.user.username,
    asignados: state.EmbargosReducer.asignados
})

export default connect(mapStateToProps, mapDispatchToProps)(Confirmados)
