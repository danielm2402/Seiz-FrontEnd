
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
      return '#EBEFF9'
    case 'SIN_CONFIRMAR':
      return '#FBE6ED'
      case 'COMPLETO':
      return '#E2F2EF'
    default:
      return '#ffffff'
     
  }
}
const colorText=(value)=>{
    switch (value) {
      case 'CONFIRMADO':
        return '#6971B8'
      case 'SIN_CONFIRMAR':
        return '#C15C83'
        case 'COMPLETO':
        return '#33AE89'
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
        { title: 'Estado', field: 'status', filtering: false},
        { title: 'Tipo', field: 'embargoType', filtering: false},
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
              <div style={{backgroundColor:color(props.value), borderRadius:'3px', padding:'10px', color:colorText(props.value), fontFamily:'Poppins,Helvetica,sans-serif !important', fontWeight:'500' }}>{props.value}</div>:<></>}
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
          let params= {}
          if(query.filters.length!==0){
           for (let i = 0; i < query.filters.length; i++) {
             if(query.filters[i].column.title==='Demandante')
             params={...params,'entidadRemitente':query.filters[i].value}
             else{
              params={...params,[(query.filters[i].column.title).toLowerCase()]:query.filters[i].value}
             }
             
           }
           console.log(params)
          }
            const config = {
                headers: {
                  Authorization: 'Bearer ' + props.token,
                  Accept: 'application/json',
                },
                params
              };
              axios.get('https://bancow.finseiz.com/api/v1/embargos/count?assignedTo='+props.username,config)
              .then(response=>{
                let total
                var page
                total=response.data
                console.log(response)
                console.log('INFORMACION DEL NUEVO REQUEST')
                axios.post('https://bancow.finseiz.com/api/v1/embargos/list?assignedTo='+props.username +'&page='+(query.page)+'&size='+query.pageSize
              ,{} , config)
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
       rowData=>({
          icon:'remove_red_eye',
          tooltip:'Ver',
          disabled: rowData.status=='CONFIRMADO'||rowData.status=='COMPLETO',
          onClick:(event, rowData)=>{
            props.handleView(rowData.id, props.token)
            props.handleDemandados(rowData.id, props.token)
            history.push(`/confirm/${rowData.id}`)
          },
        }),
      ]} 
      options={{
        filtering: true,
        pageSize: 19,
        pageSizeOptions: [],
        toolbar: true,
        paging: true,
        
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