import { palette } from '@mui/system';
import { Link } from 'react-router-dom';
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
    <Link className={className} to={path}>
      {message}
    </Link>
  );
};

const StyledLink = styled(Styled)`
  border-radius: 30px;
  text-decoration: none;
`;

export default StyledLink;
