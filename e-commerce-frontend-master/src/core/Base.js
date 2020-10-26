import React from "react";
import Navbar from "./Navbar";

const Base = ({
  title = "My Title",
  description = "My Description",
  className = "p-4 bg2",
  children,
}) => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="bg2 text-center mt3">
          <h2 className="f2">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer py3 bg3">
        <div className="container-fluid text-center py-3">
          <p className="f5">If you got any question, feel free to reach out</p>
          <button className="btn bg1 br2 dim">Contact Us</button>
        </div>
        <div className="container">
          <span className="text-muted">
            A <span className="blue">T-shirt </span>Hub
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
