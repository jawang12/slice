import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Nav from './Nav';
import 'normalize.css';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import stripes from '../assets/images/stripes.svg';

const StyledBorder = styled.div`
  max-width: 1000px;
  margin: 12rem auto 4rem auto;
  margin-top: clamp(
    2rem,
    10vw,
    12rem
  ); /*min, preferred, max; not supported by all browsers, will scale with width of browser */
  padding: 5px;
  /* clmap will fall back to above value if not supported */
  padding: clamp(5px, 1vw, 25px);
  background: white url(${stripes});
  background-size: 2000px;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.2);
  border: 5px solid white;
  @media (max-width: 1100px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;

const StyledContent = styled.div`
  background: white;
  padding: 2rem;
`;

const Layout = ({ children }) => (
  <>
    <GlobalStyles />
    <Typography />
    <StyledBorder>
      <StyledContent>
        <Nav />
        {children}
        <Footer />
      </StyledContent>
    </StyledBorder>
  </>
);

export default Layout;
