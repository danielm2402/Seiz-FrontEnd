import React, { useState }  from 'react';
import MaterialTable from 'material-table';
import Avatar from 'react-avatar';
export default function RenderImage(props) {
    return (
      <MaterialTable
      
        title="Ranking de Usuarios"
        style={{height:'500px'}}  
        columns={[
          { title: 'Avatar', field: 'imageUrl', render: rowData =>  <Avatar size={'60px'} name={rowData.name} /> },
          { title: 'Nombre', field: 'name' },
          { title: 'Apellido', field: 'surname' },
          { title: 'Usuario', field: 'username'},
          { title: 'Email', field: 'email'},
         
        ]}
        data={props.data}  
        options={{
          search:false,
          filtering: false,
          paging: false,
          pageSize: 50,
          minBodyHeight:780,
          emptyRowHeight:780,
          emptyRowHeightMedium:780,

        }}      
      />
    )
  }
