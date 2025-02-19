import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const useScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Only scroll to top on PUSH and REPLACE navigation types
    // This prevents scrolling when using the browser's back/forward buttons
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);
};

export default useScrollToTop;
