import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const StyledBeers = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;
const StyledSingleBeer = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    ${'' /* object-fit: contain will fit the image inside regardless of height or width */}
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 20px;
    color: dodgerblue;
  }
`;

const Beers = ({ data: { allBeer } }) => (
  <>
    <h2 className="center">
      We have {allBeer.nodes.length} beers on tap. Available for dine in only!
    </h2>
    <StyledBeers>
      {allBeer.nodes.map((beer) => {
        const rating = Math.round(beer.rating.average);
        return (
          <StyledSingleBeer key={beer.id}>
            <img src={beer.image} alt={beer.name} />
            <h3>{beer.name}</h3>
            {beer.price}
            {/* giving a title tag will make this accessible for people using screen readers. title will display on mouse hover */}
            <p title={`${rating} out of 5 stars`}>
              {'⭐️'.repeat(rating)}
              <span style={{ filter: 'grayscale(100%)' }}>
                {'⭐️'.repeat(5 - rating)}
              </span>
              <span> ({beer.rating.reviews})</span>
            </p>
          </StyledSingleBeer>
        );
      })}
    </StyledBeers>
  </>
);

export default Beers;

export const query = graphql`
  query {
    allBeer {
      nodes {
        name
        price
        image
        id
        rating {
          average
          reviews
        }
      }
    }
  }
`;
