import { Route, Routes } from 'react-router-dom';
import { ROUTES } from 'constants/index';
import Home from './Home';

const HomeRoot = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<Home />} path={ROUTES.HOME} />
    </Routes>
  );
};

export default HomeRoot;
