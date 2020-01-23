export default {
  header: {
    self: {},
    items: [
      
    ]
  },
  aside: {
    self: {},
    items: [
    
      { section: "Dashboard" },
      {
        title: "Inicio",
        root: true,
        icon: "flaticon2-architecture-and-city",
        page: "dashboard",
        translate: "MENU.DASHBOARD",
        bullet: "dot"
      },
      { section: "Embargos" },
      {
        title: "Asignados",
        root: true,
        bullet: "dot",
        icon: "flaticon-alert-2",
        page:"listar/asignados"
      },
      {
        title: "Subir",
        root: true,
        bullet: "dot",
        icon: "flaticon-upload",
        submenu: [
          {
            title: "Oficio",
            bullet: "dot",
            page: "upload/oficio"
            
          },
          {
            title: "Coactivos",
            bullet: "dot",
            
          },
          {
            title: "Masivos",
            bullet: "dot",
           
          },
          
            
          
        ]
      },
      {
        title: "Revisar",
        root: true,
        bullet: "dot",
        icon: "flaticon-visible",
        submenu: [
          {
            title: "Sin confirmar",
            bullet: "dot",
            
          },
          {
            title: "Confirmados",
            bullet: "dot",
            
          },
          {
            title: "Cartas",
            bullet: "dot",
           
          },

        ]
      },
      {
        title: "Historial",
        root: true,
        bullet: "dot",
        icon: "flaticon-time",
      },
    
      { section: "Cuenta" },
      {
        title: "Usuario",
        root: true,
        bullet: "dot",
        icon: "flaticon2-user",
        submenu: [
          {
            title: "Mi perfil",
            bullet: "dot",
            
          },
          {
            title: "Seguridad",
            bullet: "dot", 
          },
          {
            title: "Salir",
            bullet: "dot",
           
          },
          
            
          
        ]
      },
      
     
      
    ]
  }
};
