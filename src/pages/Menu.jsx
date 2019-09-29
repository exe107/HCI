import * as React from "react";
import { Link } from "react-router-dom";
import shapes from "../images/shapes.jpg";

const Menu = () => (
  <div className="home-full-height app-bg">
    <div className="menu-image pt-5 text-center">
      <img className="w-50 h-100" src={shapes} />
    </div>
    <div className="d-flex menu-buttons flex-column justify-content-center">
      <Link className="d-block w-50 mb-5 mx-auto" to="/shapes">
        <button className="home-button w-100 btn btn-primary">
          <h4>
            <i className="fa fa-book-open mr-1" />
            Форми
          </h4>
        </button>
      </Link>
      <Link className="d-block w-50 mb-5 mx-auto" to="/intro/0">
        <button className="home-button w-100 btn btn-primary">
          <h4>
            <i className="fa fa-shapes mr-1" />
            Вежбај
          </h4>
        </button>
      </Link>
      <Link className="d-block w-50 mb-5 mx-auto" to="/play">
        <button className="home-button w-100 btn btn-primary">
          <h4>
            <i className="fa fa-gamepad mr-1" />
            Нова игра
          </h4>
        </button>
      </Link>
    </div>
  </div>
);

export default Menu;
