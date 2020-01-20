
import React, { useState }  from 'react';
import MaterialTable from 'material-table';
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
            
     
          }),
      }}
    />
    </div>
  );
  
}

const mapStateToProps=(state)=>({
})
const mapDispatchToProps = dispatch => ({
 
  });
export default connect(mapStateToProps, mapDispatchToProps)(MaterialTableDemo);