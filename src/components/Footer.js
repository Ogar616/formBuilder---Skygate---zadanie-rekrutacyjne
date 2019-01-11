import React from "react";
import git from "../img/git.svg";

const Footer = () => (
  <div className="footer">
    <div className="container">
      <div className="copyright text-center py-3">
        Wszelkie Prawa Zastrzeżone przez Kamil Sobczyk © 2018.
        <a href="https://github.com/Ogar616">
          <img className="github" src={git} alt="github" />
        </a>
      </div>
    </div>
  </div>
);

export default Footer;
