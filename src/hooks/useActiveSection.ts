import { useState, useEffect } from 'react';

export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;

      const obs = new IntersectionObserver(
        ([e]) => { 
          if (e.isIntersecting) setActive(id); 
        },
        { threshold: 0.3 }
      );

      obs.observe(el);
      return obs;
    });

    return () => observers.forEach(o => o?.disconnect());
  }, [ids]);

  return active;
}
