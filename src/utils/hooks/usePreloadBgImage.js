import { useEffect } from 'react';

const usePreloadBgImage = (ref, url) => {
  useEffect(() => {
    if (ref?.current) {
      const newImg = new Image();

      newImg.onload = () => (ref.current.style.backgroundImage = `url('${newImg.src}')`);
      newImg.src = url;
    }
  }, [ref, url]);
};

export default usePreloadBgImage;
