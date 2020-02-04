
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
      return '#1776E8'
    case 'SIN_CONFIRMAR':
      return '#D32121'
      case 'COMPLETO':
      return '#76E111'
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
      columns={props.columns}
      components={{
        Cell: props => {
          console.log(props);
          return (
            <MTableCell
              style={{
                background: color(props.value)
                
            
                    
              }}
              {...props}
            />
          );
        }
      }}
      data={props.data}
      actions={[
       rowData=>({
          icon:'remove_red_eye',
          tooltip:'Ver',
          onClick:(event, rowData)=>{
            props.handleView(rowData.id, props.token)
            props.handleDemandados(rowData.id, props.token)
            history.push(`/view/${rowData.id}`)
          },
        }),
       rowData=> ({
          icon:'edit',
          tooltip:'Revisar',
          disabled: rowData.status=='CONFIRMADO'||rowData.status=='COMPLETO'
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