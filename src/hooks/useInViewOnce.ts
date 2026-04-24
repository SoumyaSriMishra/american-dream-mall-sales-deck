import { useRef, useState, useEffect } from 'react';

export function useInViewOnce<T extends HTMLElement = any>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => { 
        if (e.isIntersecting) { 
          setInView(true); 
          obs.disconnect(); 
        } 
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}
