import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

function numberOfPizzasInToppings(pizzas) {
  const pizzasPerTopping = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((output, current) => {
      if (output[current.name]) {
        output[current.name].count += 1;
      } else {
        output[current.name] = { id: current.id, name: current.name, count: 1 };
      }
      return output;
    }, {});

  const sortedCount = Object.values(pizzasPerTopping).sort(
    (a, b) => b.count - a.count
  );
  return sortedCount;
}

const StyledToppingsFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    padding: 5px;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    background: var(--grey);
    align-items: center;
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    .active {
      background: var(--yellow);
    }
  }
`;

const ToppingsFilter = () => {
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  const pizzasCountPerTopping = numberOfPizzasInToppings(pizzas.nodes);

  return (
    <StyledToppingsFilter>
      {pizzasCountPerTopping.map((topping) => (
        <Link to={`/topping/${topping.name}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </StyledToppingsFilter>
  );
};

export default ToppingsFilter;
