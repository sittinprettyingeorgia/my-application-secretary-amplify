import { useEffect, useRef } from 'react';

const useTitle = (title: string) => {
  const documentIsDefined = typeof document !== 'undefined';
  const original = useRef(documentIsDefined ? document.title : '');

  useEffect(() => {
    if (documentIsDefined && document.title !== title) {
      document.title = title;
    }

    const originalTitle = original.current;
    return () => {
      document.title = originalTitle;
    };
  }, [documentIsDefined, title]);
};

export default useTitle;
