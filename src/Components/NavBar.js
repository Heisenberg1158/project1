import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ isHome }) => {
  const gitRepoLink = 'https://github.com/Heisenberg1158/project1.git';

  return (
    <div className="container header">
      <Link to="/">
        {/* Optionally include a logo */}
        {/* <img src={Logo} className="logo" alt="Logo" /> */}
      </Link>

      {isHome ? (
        <Link to="/" className="header-btn1 bouncy">
          <i className="fas fa-home"></i> Home
        </Link>
      ) : (
        <a
          href={gitRepoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="header-btn1 bouncy"
        >
          <i className="fab fa-github"></i> Github
        </a>
      )}
    </div>
  );
};

export default NavBar;
