import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';

const StyledSlicemaster = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  align-items: center;
  .box {
    text-align: center;
    p {
      text-align: left;
    }
  }
`;

const Slicemaster = ({ data: { person } }) => (
  <StyledSlicemaster>
    <Img fluid={person.image.asset.fluid} />
    <div className="box">
      <h2 className="mark">{person.name}</h2>
      <p>{person.description}</p>
    </div>
  </StyledSlicemaster>
);

export default Slicemaster;

export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      description
      name
      image {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
