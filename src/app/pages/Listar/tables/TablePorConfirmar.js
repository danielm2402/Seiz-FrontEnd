
import React, { useState }  from 'react';
import MaterialTable,{ MTableCell }  from 'material-table';
import {deleteEmbargo, getEmbargo, getDemandados} from '../../../redux/actions/embargosAction'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
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
      data={query =>
        new Promise((resolve, reject) => {
            const config = {
                headers: {
                  Authorization: 'Bearer ' + props.token,
                  Accept: 'application/json',
                },
                params: {
                  'estadoEmbargo': 'CONFIRMADO'
                }
              };
              axios.get('https://bancow.finseiz.com/api/v1/embargos/count?estadoEmbargo=SIN_CONFIRMAR',config)
              .then(response=>{
                let total
                var page
                total=response.data
                console.log(response)
                console.log('INFORMACION DEL NUEVO REQUEST')
                axios.get('https://bancow.finseiz.com/api/v1/embargos/list?estadoEmbargo=SIN_CONFIRMAR&page='+(query.page)+'+&size='+query.pageSize
                , config)
                   .then(response1 => {
                     
                       var separar = response1.headers.links.split(",")
                      const array= separar.map((item)=>{
                         return item.split(";")
                       })
                       array.map((item)=>{
                         item.map((item1)=>{
                           if(item1.trim() ==='rel="next"'){
                             console.log(item)
                             var subcadena=item[0].split('=')[1]
                             page= subcadena.split('&')[0]
                      
                           }
                          
                      
                         }
           
                         
   
                         )
                       })
                       if(page== undefined)
                       {
                         page=query.page+1
                       }
                       console.log(response1)
                       console.log(page)
                     
                       resolve({
                           data: response1.data,
                          page: page-1,
                          totalCount:total
                         })
                   })
                   
                   .catch(err => console.log(err.response))
              
              })
            
              
        })
      }
      actions={[
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