import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Builder from "./Builder";
import Dashboard from "./Dashboard";
import DocsPage from "./docs/DocsPage";
import Upload from '../upload/Upload'
import Confirmados from '../Listar/Confirmados'
import NoConfirmados from '../Listar/NoConfirmados'
import Asignados from '../Listar/Asignados'
import Todos from '../Listar/Todos'
import Revisar from '../Revisar/Revisar'
import Confirmar from '../confirmar/Confirmar'
import { LayoutSplashScreen } from "../../../_metronic";

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
          <Redirect exact from="/" to="/upload" />
        }
        <Route path="/builder" component={Builder} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/upload" component={Upload}/>
        <Route path="/listar/confirmados" exact component={Confirmados}/>
        <Route path="/view/:id" component={Revisar}/>
        <Route path="/confirm/:id" component={Confirmar}/>
        <Route path="/listar/no-confirmados" exact component={NoConfirmados}/>
        <Route path="/listar/asignados" exact component={Asignados}/>
        <Route path="/listar/todos" exact component={Todos}/>
        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  )
 ;
}
