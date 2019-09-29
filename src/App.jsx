import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "popper.js/dist/popper.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Shapes from "./pages/Shapes";
import Game from "./pages/Game";
import Intro from "./pages/Intro";
import * as Actions from "./redux/actions";
import Ending from "./pages/Ending";

const App = props => {
  const { resetState } = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/ending" component={Ending} />
        <Route>
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <button
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="navbar-nav">
                <Link className="nav-item nav-link" to="/shapes">
                  <h4>
                    <i className="fa fa-book-open mr-1" />
                    Форми
                  </h4>
                </Link>
                <Link
                  onClick={resetState}
                  className="nav-item nav-link"
                  to="/intro/0"
                >
                  <h4>
                    <i className="fa fa-shapes mr-1" />
                    Вежбај
                  </h4>
                </Link>
                <Link className="nav-item nav-link" to="/play?reset=1">
                  <h4>
                    <i className="fa fa-gamepad mr-1" />
                    Нова игра
                  </h4>
                </Link>
              </div>
            </div>
          </nav>
          <div className="container-fluid app-bg full-height">
            <Switch>
              <Route path="/shapes" component={Shapes} />
              <Route path="/play" component={Game} />
              <Route path="/intro/:id" component={Intro} />
              <Redirect to="/home" />
            </Switch>
          </div>
        </Route>
      </Switch>
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
