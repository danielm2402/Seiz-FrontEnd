
import React, { useState }  from 'react';
import MaterialTable from 'material-table';
import {deleteEmbargo} from '../../redux/actions/embargosAction'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


function MaterialTableDemo(props) {

  return (
    <div>
    <MaterialTable
      title={props.nombre}
      columns={props.columns}
      data={props.data}
      actions={[
        {
          icon: 'border_color',
          tooltip: 'Editar',
        },{
          icon:'remove_red_eye',
          tooltip:'Ver'
        }
      ]}
      options={{
        pageSize: 19,
        pageSizeOptions: [],
        toolbar: true,
        paging: true
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
  handleEliminar: bindActionCreators(deleteEmbargo,dispatch)
  });
export default connect(mapStateToProps, mapDispatchToProps)(MaterialTableDemo);