import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

const Pizza = ({ data: { allPizzas } }) => {
  console.log(allPizzas);
  return (
    <>
      <p>We currently have {allPizzas.nodes.length} pizzas available.</p>
      <ToppingsFilter />
      <PizzaList pizzas={allPizzas.nodes} />
    </>
  );
};

export const query = graphql`
  query PizzasQuery($nameRegEx: String) {
    allPizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { regex: $nameRegEx } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

export default Pizza;
