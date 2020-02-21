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
        icon: "flaticon2-chart",
        page: "dashboard",
        translate: "MENU.DASHBOARD",
        bullet: "dot"
      },
      { section: "Embargos" },
      {
        title: "Asignados",
        root: true,
        bullet: "dot",
        icon: "flaticon-bell",
        page:"listar/asignados"
      },
      {
        title: "Subir",
        root: true,
        bullet: "dot",
        icon: "flaticon-upload", 
        page:"upload" 
        
      },
      {
        title: "Revisar",
        root: true,
        bullet: "dot",
        icon: "flaticon-eye",
        submenu: [
          {
            title: "Sin confirmar",
            bullet: "dot",
            page:"listar/no-confirmados" 
            
          },
          {
            title: "Confirmados",
            bullet: "dot",
            page:"listar/confirmados"
          },
         

        ]
      },
      {
        title: "Historial",
        root: true,
        bullet: "dot",
        icon: "flaticon2-calendar-1",
      },

      { section: "Gestión " },
      {
        title: "Usuarios",
        root: true,
        bullet: "dot",
        icon: "flaticon-users-1",
        submenu: [
          {
            title: "Listar",
            bullet: "dot",
            
          },
        ]
        
      },
      { section: "Cuenta" },
      {
        title: "Mi Usuario",
        root: true,
        bullet: "dot",
        icon: "flaticon2-user",
        submenu: [
          {
            title: "Mi perfil",
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
