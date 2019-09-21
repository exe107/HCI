import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "popper.js/dist/popper.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import Shapes from "./pages/Shapes";
import Game from "./pages/Game";
import Intro from "./pages/Intro";
import Ending from "./pages/ending/Ending";
import * as Actions from "./redux/actions";

const App = props => {
  const { resetState } = props;

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav">
            <Link
              onClick={resetState}
              className="nav-item nav-link"
              to="/shapes"
            >
              <h5>
                <i className="fa fa-shapes mr-1" />
                Учи форми
              </h5>
            </Link>
            <Link className="nav-item nav-link" to="/play?reset=1">
              <h5>
                <i className="fa fa-gamepad mr-1" />
                Нова игра
              </h5>
            </Link>
          </div>
        </div>
      </nav>
      <div className="container-fluid app-bg full-height">
        <Switch>
          <Route path="/shapes" component={Shapes} />
          <Route path="/play" component={Game} />
          <Route path="/intro/:id" component={Intro} />
          <Route path="/ending" component={Ending} />
          <Redirect to="/shapes" />
        </Switch>
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
