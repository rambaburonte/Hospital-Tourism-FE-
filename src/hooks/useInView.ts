import { useState, useEffect } from 'react';

export default function useInView(ref: React.RefObject<HTMLElement>, threshold = 0.1): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, threshold]);

  return isInView;
}
