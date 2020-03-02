import React, { useState }  from 'react';
import MaterialTable from 'material-table';
import Avatar from 'react-avatar';
export default function RenderImage(props) {
    return (
      <MaterialTable
        title="Ranking"
        columns={[
          { title: 'Avatar', field: 'imageUrl', render: rowData =>  <Avatar size={'60px'} name={rowData.name} /> },
          { title: 'Nombre', field: 'name' },
          { title: 'Apellido', field: 'surname' },
          { title: 'Usuario', field: 'username'},
          { title: 'Email', field: 'email'},
         
        ]}
        data={props.data}  
        options={{
          filtering: false,
          paging: false,
          pageSize: 5,
        }}      
      />
    )
  }
