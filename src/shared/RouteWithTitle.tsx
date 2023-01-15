import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

const RouteWithTitle = ({
  title,
  path,
  element
}: {
  title: string;
  path: string;
  element: JSX.Element;
}) => {
  useEffect(() => {
    document.title = `${title} | My Application Secretary`;
  }, [title]);

  return <Route path={path} element={element} />;
};

export default RouteWithTitle;
