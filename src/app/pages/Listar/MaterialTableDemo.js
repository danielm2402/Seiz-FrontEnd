
import React, { useState }  from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';


function MaterialTableDemo(props) {
  const [state, setState] = React.useState({
    open:false
  });

  const [open, setOpen] = useState(false);
  return (
    <div>
    <MaterialTable
      title={props.nombre}
      columns={props.columns}
      //data={props.data}
      actions={[
        {
          icon: 'border_color',
          tooltip: 'Actualizar propiedad',
          
        }
      ]}
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