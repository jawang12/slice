import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const StyledPizzaList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const StyledPizza = styled.div`
  display: grid;
  /* Take the row sizing not from the StyledPizza div but from the StyledPizzaList div/grid 
    -subgrid is not supported by chrome
    line 19 - for chrome, tries to run arg in parenthesis, if it doesnt work then run bracket
  */
  @supports not (grid-template-rows: subgrid) {
    /* grid-template-rows: auto auto 1fr; */
    --rows: auto auto 1fr;
  }
  /* check if --rows exists otherwise use subgrid */
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

const Pizza = ({ pizza }) => (
  <StyledPizza>
    <Link to={`/pizza/${pizza.slug.current}`}>
      <h2>
        <span className="mark">{pizza.name}</span>
      </h2>
    </Link>
    <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
    <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
  </StyledPizza>
);

const PizzaList = ({ pizzas }) => (
  <StyledPizzaList>
    {pizzas.map((pizza) => (
      <Pizza pizza={pizza} key={pizza.id} />
    ))}
  </StyledPizzaList>
);

export default PizzaList;
