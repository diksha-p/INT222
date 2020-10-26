import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const UserDashBoard = () => {
  const {
    user: { name, email },
  } = isAuthenticated();

  const userLeftSide = () => {
    return (
      <div className="card f6 tc shadow-2 bn">
        <p className="card-header bg1 f5 b white">Navigation</p>
        <ul className="list-group">
          <li className="list-group-item blue">
            <Link to="/" className="nav-link dim">
              <i className="fa fa-home"></i> Home
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/cart" className="nav-link dim">
              <i className="fa fa-shopping-cart"></i> Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="#" className="nav-link dim">
              <i className="fa fa-envelope"></i> Contact
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userRightSide = () => {
    return (
      <div className="card card f5 shadow-2 bn">
        <p className="card-header bg1 b white">Informations</p>
        <ul className="list-group">
          <li className="list-group-item f4">
            <span className="badge bg-pink white">Dashboard</span>
          </li>
          <li className="list-group-item">
            <span className="badge badge-info mr2">
              <i className="fa fa-user" title="name"></i> :{" "}
            </span>{" "}
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-info mr2">
              <i className="fa fa-envelope" title="email"></i> :{" "}
            </span>{" "}
            {email}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="DashBoard"
      description="You can navigate from here.."
      className="container"
    >
      <div className="row mb3">
        <div className="col col-md-3">{userLeftSide()}</div>
        <div className="col col-md-9">{userRightSide()}</div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
