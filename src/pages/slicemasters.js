import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';

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

const Slicemasters = ({ data: { slicemasters }, pageContext }) => (
  <>
    <Pagination
      pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
      totalCount={slicemasters.totalCount}
      currentPage={pageContext.currentPage || 1}
      base="slicemasters"
    />
    <StyledSlicemasterGrid>
      {slicemasters.nodes.map((person) => (
        <StyledSlicemaster key={person.id}>
          <Link to={`/slicemasters/${person.slug.current}`}>
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
  query($skip: Int = 0, $pageSize: Int = 2) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
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

/* if you want to explicitly allow something from a .env file to be surfaced via the front-end, you have to 
include GATSBY_ as a prefix. */
