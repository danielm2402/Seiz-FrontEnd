
import React, { useState }  from 'react';
import MaterialTable from 'material-table';
import {deleteEmbargo, getEmbargo, getDemandados} from '../../redux/actions/embargosAction'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
function MaterialTableDemo(props) {
  let history=useHistory()
  return (
    <div>
    <MaterialTable
      title={'Embargos por confirmar'}
      columns={[
      
        {title:'Id', field:'id'},
        { title: 'Demandante', field: 'plaintiffs[0].fullname'},
        { title: 'Ciudad', field: 'city'},
        { title: 'Estado', field: 'status'},
        { title: 'Tipo', field: 'embargoType'},
        { title: 'Fecha de carga', field: 'createdAt'},
        { title: 'Fecha Oficio', field: 'documentDate'},
   
      ]}
      data={props.data}
      
      options={{
        pageSize: 5,
        pageSizeOptions: [],
        toolbar: true,
        paging: true
    }}
    editable={{
      isEditable: rowData => props.editable === true, // only name(a) rows would be editable
      isDeletable: rowData => props.editable === true, // only name(a) rows would be deletable
      onRowAdd:props.add,
      onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
              setTimeout(() => {
                  {
                      /* const data = this.state.data;
                      const index = data.indexOf(oldData);
                      data[index] = newData;                
                      this.setState({ data }, () => resolve()); */
                  }
                  resolve();
              }, 1000);
          }),
      onRowDelete: oldData =>
          new Promise((resolve, reject) => {
              setTimeout(() => {
                  {
                      /* let data = this.state.data;
                      const index = data.indexOf(oldData);
                      data.splice(index, 1);
                      this.setState({ data }, () => resolve()); */
                  }
                  resolve();
              }, 1000);
          })
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