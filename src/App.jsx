import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import Shapes from "./pages/Shapes";
import Game from "./pages/Game";
import Intro from "./pages/Intro";
import * as Actions from "./redux/actions";

const App = props => {
  const { resetState } = props;

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link
              onClick={resetState}
              className="nav-item nav-link"
              to="/shapes"
            >
              Учи форми
            </Link>
            <Link className="nav-item nav-link" to="/play">
              Нова игра
            </Link>
          </div>
        </div>
      </nav>
      <div className="container-fluid bg-info">
        <div>
          <Switch>
            <Route path="/shapes" component={Shapes} />
            <Route path="/play" component={Game} />
            <Route path="/intro/:id" component={Intro} />
            <Redirect to="/shapes" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      resetState: Actions.resetState
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(App);
