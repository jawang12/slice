import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

const StyledNav = styled.nav`
  margin-bottom: 3rem;
  .logo {
    transform: translateY(-25%);
  }
  ul {
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    grid-gap: 2rem;
    align-items: center;
    text-align: center;
    list-style: none;
  }
  li {
    --rotate: -2deg; /* designate a var and then change it */
    transform: rotate(var(--rotate));
    order: 1;
    &:nth-child(1) {
      --rotate: 1deg;
    }
    &:nth-child(2) {
      --rotate: -2.5deg;
    }
    &:nth-child(4) {
      --rotate: 2.5deg;
    }
    &:nth-child(5) {
      --rotate: -1deg;
    }
    &:hover {
      --rotate: 4deg;
    }
  }
  a {
    font-size: 3rem;
    text-decoration: none;
    &:hover {
      color: cornflowerblue;
    }
  }
`;

const Nav = () => (
  <StyledNav>
    <ul>
      <li>
        <Link to="/">What's Buzzin</Link>
      </li>
      <li>
        <Link to="/pizza">Pizza Menu</Link>
      </li>
      <li>
        <Link to="/">
          <Logo />
        </Link>
      </li>
      <li>
        <Link to="/slicemasters">Slice Masters</Link>
      </li>
      <li>
        <Link to="/order">Order Now!</Link>
      </li>
    </ul>
  </StyledNav>
);

export default Nav;
