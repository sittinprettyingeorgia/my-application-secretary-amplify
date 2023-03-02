import { useEffect, useRef } from 'react';

const useTitle = (title: string) => {
  const documentIsDefined = typeof document !== 'undefined';
  const original = useRef(documentIsDefined ? document.title : '');

  useEffect(() => {
    if (documentIsDefined && document.title !== title) {
      document.title = title;
    }

    return () => {
      document.title = original.current;
    };
  }, []);
};

export default useTitle;
