import React, { Component } from 'react'
import { connect } from 'react-redux'
import MaterialTableDemo from './MaterialTableDemo'
class Tabla extends Component {
    render() {
        var columns=[
      
            {title:'Nombre', field:'nombres'},
            { title: 'Tipo ID', field: 'tipoIdentificacion'},
            { title: 'Identificación', field: 'identificacion'},
            { title: 'Monto', field: 'montoAEmbargar'},    
          ]
        return (
            <div>
                <MaterialTableDemo nombre="Demandados" columns={columns} data={this.props.demandados.data} />
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    embargo: state.EmbargosReducer.embargo,
    demandados: state.EmbargosReducer.demandados
})

export default connect(mapStateToProps, null)(Tabla)