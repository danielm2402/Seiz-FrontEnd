import React, { Component } from 'react'
import Avatar from 'react-avatar';
import TableUsuarios from './TableUsuarios'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

class Confirmados extends Component {
   
   
    render() {
        var columns=[
      
            {title:'Usuario', field:'username'},
            { title: 'Nombre', field: 'nombre'},
            { title: 'email', field: 'email'},
            { title: 'foto', field: 'foto',render: rowData => <Avatar round size="40" name={rowData.nombre} /> },
          ]
        return (
            <div>
                <TableUsuarios token={this.props.token}nombre="Usuarios" columns={columns} />
            </div>
        )
    }
}

const mapDispatchToProps=(dispatch)=>({
    
})
const mapStateToProps=(state)=>({
    token: state.auth.authToken,
    confirmados: state.EmbargosReducer.confirmados
})

export default connect(mapStateToProps, mapDispatchToProps)(Confirmados)
