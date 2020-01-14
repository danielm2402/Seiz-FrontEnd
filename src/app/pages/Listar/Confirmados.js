import React, { Component } from 'react'
import MaterialTableDemo from './MaterialTableDemo'
export default class Confirmados extends Component {
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
