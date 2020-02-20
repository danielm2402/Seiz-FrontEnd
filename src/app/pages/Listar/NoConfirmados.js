import React, { Component } from 'react'
import MaterialTableDemo from './MaterialTableDemo'
import TableSinConfirmar from './tables/TablePorConfirmar'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {getEmbargosPorConfirmar} from '../../redux/actions/embargosAction'
class Confirmados extends Component {
    componentDidMount(){
        console.log('montando component')
        console.log(this.props.confirmados)
        this.props.handleRequestEmbargos(this.props.token)
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
                <TableSinConfirmar token={this.props.token} nombre="Embargos" columns={columns} data={this.props.NoConfirmados} />
            </div>
        )
    }
}

const mapDispatchToProps=(dispatch)=>({
    handleRequestEmbargos: bindActionCreators(getEmbargosPorConfirmar,dispatch)
})
const mapStateToProps=(state)=>({
    token: state.auth.authToken,
    NoConfirmados: state.EmbargosReducer.porConfirmar
})

export default connect(mapStateToProps, mapDispatchToProps)(Confirmados)
