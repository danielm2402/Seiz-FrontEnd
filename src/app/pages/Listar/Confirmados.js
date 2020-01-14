import React, { Component } from 'react'
import MaterialTableDemo from './MaterialTableDemo'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {getEmbargos} from '../../redux/actions/embargosAction'
class Confirmados extends Component {
    componentDidMount(){
        console.log('montando component')
        this.props.handleRequestEmbargos('CONFIRMADOS', this.props.token)
    }
    render() {
        var columns=[
      
            {title:'Id', field:'id'},
            { title: 'Demandante', field: 'descripcion'},
            { title: 'Ciudad', field: 'valor_base'},
            { title: 'Estado', field: 'valor_publico'},
            { title: 'Tipo', field: 'valor_publico'},
            { title: 'Fecha de carga', field: 'valor_publico'},
            { title: 'Respuestas', field: 'valor_publico'},
       
          ]
        return (
            <div>
                <MaterialTableDemo nombre="Embargos" columns={columns} data={null}/>
            </div>
        )
    }
}

const mapDispatchToProps=(dispatch)=>({
    handleRequestEmbargos: bindActionCreators(getEmbargos,dispatch)
})
const mapStateToProps=(state)=>({
    token: state.auth.authToken
})

export default connect(mapStateToProps, mapDispatchToProps)(Confirmados)
