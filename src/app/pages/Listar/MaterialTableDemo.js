
import React, { useState }  from 'react';
import MaterialTable,{ MTableCell }  from 'material-table';
import {deleteEmbargo, getEmbargo, getDemandados} from '../../redux/actions/embargosAction'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'

const color=(value)=>{
  switch (value) {
    case 'CONFIRMADO':
      return '#03A9F4'
    case 'SIN_CONFIRMAR':
      return '#F44336'
      case 'COMPLETO':
      return '#4CAF50'
    default:
      return '#ffffff'
     
  }
}

function MaterialTableDemo(props) {
  let history=useHistory()
  return (
    <div>
    <MaterialTable
      title={props.nombre}
      columns={[
      
        {title:'Id', field:'id'},
        { title: 'Demandante', field: 'plaintiffs[0].fullname'},
        { title: 'Ciudad', field: 'city'},
        { title: 'Estado', field: 'status'},
        { title: 'Tipo', field: 'embargoType'},
        { title: 'Fecha de carga', field: 'createdAt'},
        { title: 'Fecha Oficio', field: 'documentDate'},
   
      ]}
      components={{
        Cell: props => {
          console.log('LA CELDA TABLE')
          console.log(props);
          if(props.columnDef.field=='status'){
          return (
            
            <MTableCell
      
            >
              {props.columnDef.field=='status'?
              <span style={{backgroundColor:color(props.value), borderRadius:'3px'}}>{props.value}</span>:<></>}
              </MTableCell>
          );
        }
        else{
          return(
          <MTableCell
             
          {...props}
        />)
        }
      }
      
      }}
      data={props.data}
      actions={[
       rowData=>({
          icon:'remove_red_eye',
          tooltip:'Ver',
          disabled: rowData.status=='SIN_CONFIRMAR',
          onClick:(event, rowData)=>{
            props.handleView(rowData.id, props.token)
            props.handleDemandados(rowData.id, props.token)
            history.push(`/view/${rowData.id}`)
          },
        }),
       rowData=> ({
          icon:'edit',
          tooltip:'Revisar',
          disabled: rowData.status=='CONFIRMADO'||rowData.status=='COMPLETO',
          onClick:(event, rowData)=>{
            props.handleView(rowData.id, props.token)
            props.handleDemandados(rowData.id, props.token)
            history.push(`/confirm/${rowData.id}`)
          },
        })
      ]}
      options={{
        filtering: true,
        pageSize: 19,
        pageSizeOptions: [],
        toolbar: true,
        paging: true,
        rowStyle: {
          backgroundColor: '#EEE',
        }
    }}
      editable={{
        onRowDelete: oldData =>
          new Promise(resolve => {
            
            resolve()
            console.log(oldData)
            props.handleEliminar(oldData.id, props.token, props.pathname)
          
     
          }),
        
       
    }}
     
    />
    </div>
  );
  
}

const mapStateToProps=(state)=>({
  token: state.auth.authToken,
})
const mapDispatchToProps = dispatch => ({
  handleEliminar: bindActionCreators(deleteEmbargo,dispatch),
  handleView: bindActionCreators(getEmbargo,dispatch),
  handleDemandados: bindActionCreators(getDemandados, dispatch)
  });
export default connect(mapStateToProps, mapDispatchToProps)(MaterialTableDemo);