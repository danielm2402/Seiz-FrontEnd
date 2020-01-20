import React, { Component } from 'react'
import MaterialTableDemo from './MaterialTableDemo'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {getEmbargosConfirmados} from '../../redux/actions/embargosAction'
class Confirmados extends Component {
    componentDidMount(){
        console.log('montando component')
        console.log(this.props)
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
                <MaterialTableDemo nombre="Embargos" columns={columns} data={this.props.confirmados} />
            </div>
        )
    }
}

const mapDispatchToProps=(dispatch)=>({
    handleRequestEmbargos: bindActionCreators(getEmbargosConfirmados,dispatch)
})
const mapStateToProps=(state)=>({
    token: state.auth.authToken,
    confirmados: state.EmbargosReducer.confirmados
})

export default connect(mapStateToProps, mapDispatchToProps)(Confirmados)
