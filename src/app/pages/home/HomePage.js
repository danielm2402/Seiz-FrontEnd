import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Builder from "./Builder";
import Dashboard from "./Dashboard";
import DashboardChoice from './DashboardChoice'
import DocsPage from "./docs/DocsPage";
import Upload from '../upload/Upload'
import Confirmados from '../Listar/Confirmados'
import Cartas from '../Listar/Cartas'
import NoConfirmados from '../Listar/NoConfirmados'
import Asignados from '../Listar/Asignados'
import Todos from '../Listar/Todos'
import Revisar from '../Revisar/Revisar'
import Confirmar from '../confirmar/Confirmar'
import { LayoutSplashScreen } from "../../../_metronic";
import Usuarios from '../auth/usuarios/Usuarios'
import User from '../usuarios/User'
import UploadExcel from '../uploadExcel/Upload'
const GoogleMaterialPage = lazy(() =>
  import("./google-material/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./react-bootstrap/ReactBootstrapPage")
);

export default function HomePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <Route path="/builder" component={Builder} />
        <Route path="/dashboard" component={DashboardChoice} />
        <Route path="/upload" exact component={Upload}/>
        <Route path="/listar/confirmados" exact component={Confirmados}/>
        <Route path="/view/:id" component={Revisar}/>
        <Route path="/confirm/:id" component={Confirmar}/>
        <Route path="/listar/no-confirmados" exact component={NoConfirmados}/>
        <Route path="/listar/asignados" exact component={Asignados}/>
        <Route path="/listar/todos" exact component={Todos}/>
        <Route path="/listar/users" exact component={Usuarios}/>
        <Route path="/listar/cartas" exact component={Cartas}/>
        <Route path="/user/:id" exact component={User}/>
        <Route path="/upload/excel/:id" exact component={UploadExcel}/>
        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  )
 ;
}
