import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const StyledSlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const StyledSlicemaster = styled.div`
  a {
    text-decoration: none;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  .description {
    background: var(--yellow);
    text-align: center;
    padding: 1rem;
    margin: 2rem;
    position: relative;
    margin-top: -6rem;
    z-index: 2;
    transform: rotate(1deg);
  }
`;

const Slicemasters = ({ data: { slicemasters } }) => (
  <>
    <StyledSlicemasterGrid>
      {slicemasters.nodes.map((person) => (
        <StyledSlicemaster key={person.id}>
          <Link to={`/slicemaster/${person.slug.current}`}>
            <h2>
              <span className="mark">{person.name}</span>
            </h2>
          </Link>
          <Img fluid={person.image.asset.fluid} />
          <p className="description">{person.description}</p>
        </StyledSlicemaster>
      ))}
    </StyledSlicemasterGrid>
  </>
);

export default Slicemasters;

export const query = graphql`
  query {
    slicemasters: allSanityPerson {
      totalCount
      nodes {
        name
        slug {
          current
        }
        id
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
