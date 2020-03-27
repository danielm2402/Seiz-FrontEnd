
import React, { useState }  from 'react';
import MaterialTable,{ MTableCell }  from 'material-table';
import {getUser} from '../../../redux/actions/userAction'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import Infografia from './Infografia'
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
      columns={props.columns}
      components={{
        Cell: props => {
          
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
           
              axios.get('https://bancow.finseiz.com/api/v1/users/list?size=2',config)
              .then(response=>{
               
              
                let total
                var page
                total=response.data
               
                axios.get('https://bancow.finseiz.com/api/v1/users/list?'+'size=50'
                , config)
                   .then(response1 => {
                       var separar = response.headers.links.split(",")
                      const array= separar.map((item)=>{
                         return item.split(";")
                       })
                       array.map((item)=>{
                         item.map((item1)=>{
                           if(item1.trim() ==='rel="last"'){
                            
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
                      
                     
                       resolve({
                           data: response1.data,
                          page: response1.data.length-1,
                          totalCount:(page*2)
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
          onClick:(event, rowData)=>{
            props.handleView(rowData.id, props.token)
            history.push(`/user/${rowData.id}`)
          },
        })
      ]}
      options={{
       
        filtering: false,
        pageSize: 20,
        pageSizeOptions: [],
        toolbar: true,
        paging: false,
        
    }}
      editable={{
        onRowDelete: oldData =>
        new Promise((resolve, reject) => {
          const config = {
              headers: {
                Authorization: 'Bearer ' + props.token,
                Accept: 'application/json',
              },
            };
            axios.get('https://bancow.finseiz.com/api/v1/users/'+oldData.id,config)
            .then(response=>{
              
              resolve();
            })

      })
        
       
    }}
    detailPanel={rowData => {
      return (
        <div style={{ marginTop:'10px', marginBottom:'10px', marginLeft:'10px', marginRight:'10px'}}>
          <Infografia/>
        </div>
      )
    }}
     
    />
    </div>
  );
  
}

const mapStateToProps=(state)=>({
  token: state.auth.authToken,
})
const mapDispatchToProps = dispatch => ({
 
  handleView: bindActionCreators(getUser,dispatch),
 
  });
export default connect(mapStateToProps, mapDispatchToProps)(MaterialTableDemo);