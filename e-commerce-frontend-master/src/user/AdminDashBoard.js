import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const {
    user: { name, email },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card f6 tc shadow-2 bn">
        <p className="card-header bg1 f5 b white">Admin navigation</p>
        <ul className="list-group">
          <li className="list-group-item blue">
            <Link to="/admin/create/category" className="nav-link dim">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link dim">
              Create Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link dim">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link dim">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card card f5 shadow-2 bn">
        <p className="card-header bg1 b white">Informations</p>
        <ul className="list-group">
          <li className="list-group-item f4">
            <span className="badge bg-pink white">Admin Area</span>
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
      title="Welcome to Admin DashBoard"
      description="Manage your products here..."
      className="container"
    >
      <div className="row mb3">
        <div className="col col-md-3">{adminLeftSide()}</div>
        <div className="col col-md-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
