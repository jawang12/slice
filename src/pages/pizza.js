import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';

const Pizza = ({ data: { allPizzas } }) => {
  console.log(allPizzas);
  return (
    <>
      <p>We currently have {allPizzas.nodes.length} pizzas available.</p>
      <PizzaList pizzas={allPizzas.nodes} />
    </>
  );
};

export const query = graphql`
  query PizzasQuery {
    allPizzas: allSanityPizza {
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
