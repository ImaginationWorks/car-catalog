import React from 'react';
import { Link } from 'react-router-dom';


const links = [
  {
    to: '/',
    text: 'Home'
  },
  {
    to: '/search',
    text: 'Search'
  }
];

const isCurrent = (to, current) => {
  if (to === '/' && current === to) {
    return true;
  } else if (to !== '/' && current.includes(to)) {
    return true;
  }

  return false;
};

const HeaderLink = ({ to, text, current }) => (
  <li className={isCurrent(to, current) ? 'header__links_current_yes' : 'header__links_current_no'}>
    <Link to={to}>{text}</Link>
  </li>
);

const Header = ({ current }) => (
  <header className="header">
    <h1 className="header__title">Car Catalog</h1>
    <ul className="header__links">
      {links.map((link, index) => {
        return <HeaderLink key={index} current={current} {...link} />;
      })}
    </ul>
  </header>
);


export default Header;
