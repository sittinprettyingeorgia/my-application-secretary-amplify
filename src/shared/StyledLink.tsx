import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Styled = ({
  path,
  message,
  className
}: {
  path: string;
  message?: string;
  className?: string;
}): JSX.Element => {
  return (
    <Link className={className} href={path}>
      {message}
    </Link>
  );
};

const StyledLink = styled(Styled)`
  border-radius: 30px;
  text-decoration: none;
  color: white;
`;

export default StyledLink;
