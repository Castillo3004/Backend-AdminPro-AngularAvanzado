

const getMenuFrontend = ( rol = 'USER_ROLE' ) => {
    
    const  menu = [
        {
          title: 'Dashboard',
          icon: 'mdi mdi-gauge',
          submenu: [
            { title: 'Main', url: '/' },
            { title: 'ProgressBar', url: 'progress' },
            { title: 'Gráficas', url: 'grafica1' },
            { title: 'Promesas', url: 'promesas' },
            { title: 'RxJS', url: 'rxjs' },
          ]
        },
    
        {
          title: 'Mantenimiento',
          icon: 'mdi mdi-folder-lock-open',
          submenu: [
            // { title: 'Usuarios', url: 'usuarios' },
            { title: 'Hospitales', url: 'hospitales' },
            { title: 'Medicos', url: 'medicos' },
          ]
        }
    ];

    if( rol === 'ADMIN_ROLE' ){
        menu[1].submenu.unshift({ title: 'Usuarios', url: 'usuarios' })
    }

    return menu;

}


module.exports = {
    getMenuFrontend,
}