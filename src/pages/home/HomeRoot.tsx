import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants';
import RouteWithTitle from '../../shared/RouteWithTitle';
import Home from './Home';

const HomeRoot = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<Home />} path={ROUTES.HOME} />
    </Routes>
  );
};

export default HomeRoot;
