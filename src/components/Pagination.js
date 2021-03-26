import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const StyledPagination = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;
  text-align: center;
  /* grab each direct decendent */
  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    text-decoration: none;
    &[aria-current],
    &.current {
      color: var(--red);
    }
    /* and(&) anything that has the disabled attribute */
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;

const Pagination = ({ pageSize, totalCount, currentPage, base }) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;
  const directPageLinks = [];

  for (let i = 1; i <= totalPages; i += 1) {
    directPageLinks.push(
      <Link
        className={currentPage === 1 && i === 1 ? 'current' : ''}
        to={`/${base}/${i === 1 ? '' : i}`}
        key={`${base}-${i}`}
      >
        {i}
      </Link>
    );
  }

  return (
    <StyledPagination>
      <Link disabled={!hasPrevPage} to={`/${base}/${prevPage}`}>
        &#8592; Prev
      </Link>
      {directPageLinks}
      <Link disabled={!hasNextPage} to={`/${base}/${nextPage}`}>
        &#8592; Prev
      </Link>
    </StyledPagination>
  );
};

export default Pagination;
