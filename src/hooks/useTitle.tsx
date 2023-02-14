import { useEffect } from 'react';

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} | My Application Secretary`;
  }, [title]);
};

export default useTitle;
