// src/app.js
export class App{  
    message = 'Hello World Aurelia';


    configureRouter(config, router){
        config.title = 'Aurelia';

        config.map([
            { route: ['','signin'],  name: 'Signin',
                moduleId: './Components/signin/signin', nav: true, title:'Signin' },
            { route: 'report',  name: 'Report',
                moduleId: './Components/report/report', nav: true, title:'Report' },
            { route: 'dashboard',  name: 'Dashboard',
                moduleId: './Components/dashboard/dashboard', nav: true, title:'Dashboard' },
            { route: 'release',  name: 'Release',params:"id",
                moduleId: './Components/react-component/react-example', nav: true, title:'Release' },
            { route: 'release/:id',  name: 'Release',
                moduleId: './Components/react-component/report-details/report-detail', nav: false, title:'Release Detail' },
            { route: 'employee',  name: 'Employee',
                moduleId: './Components/employee/employee', nav: true, title:'Employee' },
            { route: 'employeelist',  name: 'Employee List',
                moduleId: './Components/employeelist/employeelist', nav: true, title:'Employee List' }
        ]);
        config.mapUnknownRoutes('not-found');
        this.router = router;
    }
}
