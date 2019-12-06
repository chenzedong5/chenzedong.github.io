import React from 'react';
import Home from './view/Home';
import Music from "./view/Music";
import PsyTest from "./view/PsyTest";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux"
import store from "store";

function App() {
  return (
    <>
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route path="/home" component={Home} />
            {/* <Route path="/music" component={Music} /> */}
            <Route path="/psy_test" component={PsyTest} />
            <Redirect to={"/home"} />
          </Switch>
        </HashRouter>
      </Provider>
    </>
  );
}

export default App;
