import { Link } from 'gatsby';
import React from 'react';

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">What's Buzzin</Link>
      </li>
      <li>
        <Link to="/pizza">Pizza Menu</Link>
      </li>
      <li>
        <Link to="/">Logo</Link>
      </li>
      <li>
        <Link to="/slicemasters">Slice Masters</Link>
      </li>
      <li>
        <Link to="/order">Order Now!</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
