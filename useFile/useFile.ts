import { useEffect, useRef, useState } from 'react';

export const useFile = (file?: File) => {
  const [dataURL, setDataURL] = useState<string | undefined>();

  const reader = useRef(new FileReader());

  useEffect(() => {
    const fileReader = reader.current;
    let isMounted = true;

    fileReader.onload = evt => {
      const result = evt.target?.result;
      if (typeof result == 'string' && isMounted) setDataURL(result);
    };

    return () => {
      isMounted = false;
      fileReader.abort();
    };
  }, []);

  useEffect(() => {
    const fileReader = reader.current;

    if (file) fileReader.readAsDataURL(file);
    else setDataURL(undefined);

    return () => fileReader.abort();
  }, [file]);

  return dataURL;
};
